#![no_std]

pub mod models;
pub use models::*;

imports!();
derive_imports!();

use elrond_wasm::HexCallDataSerializer;

const ESDT_TRANSFER_STRING: &[u8] = b"ESDTTransfer";

#[elrond_wasm_derive::contract(PaymentAccountImpl)]
pub trait PaymentAccount {
	#[init]
	fn init(&self) {
		let my_address: Address = self.get_caller();
		self.set_owner(&my_address);
	}

  #[payable("*")]
	#[endpoint]
	fn deposit(&self) -> SCResult<()> {
		let caller = self.get_caller();

		// TODO: allow shared access to payment account
		if caller != self.get_owner() {
			return sc_error!("only owner can deposit assets");
		}

		Ok(())
	}

	#[endpoint]
	fn withdraw(&self, amount: BigUint, esdt_token_name: BoxedBytes) -> SCResult<()> {
		// TODO: check for withdrawal lock if active card authorization
		// TODO: check balance available?

		let caller = self.get_caller();

		// TODO: allow shared access to payment account
		if caller != self.get_owner() {
			return sc_error!("only owner can withdraw assets");
		}

    self.pay_esdt(&esdt_token_name, &amount, &caller);

    Ok(())
	}

	fn pay_esdt(&self, esdt_token_name: &BoxedBytes, amount: &BigUint, to: &Address) {
		let mut serializer = HexCallDataSerializer::new(ESDT_TRANSFER_STRING);
		serializer.push_argument_bytes(esdt_token_name.as_slice());
		serializer.push_argument_bytes(amount.to_bytes_be().as_slice());

		self.async_call(&to, &BigUint::zero(), serializer.as_slice());
	}

	// storage

	#[storage_set("owner")]
	fn set_owner(&self, address: &Address);

	#[view]
	#[storage_get("owner")]
	fn get_owner(&self) -> Address;

	#[storage_set("card")]
	fn set_card(&self, cardId: &BoxedBytes, subscription_authorization: &CardAuthorization);

	#[view]
	#[storage_get("card")]
	fn get_card(&self, cardId: &BoxedBytes) -> CardAuthorization;

	#[storage_set("subscription")]
	fn set_subscription(&self, subscriptionId: &BoxedBytes, subscription_authorization: &SubscriptionAuthorization);

	#[view]
	#[storage_get("subscription")]
	fn get_subscription(&self, subscriptionId: &BoxedBytes) -> SubscriptionAuthorization;
}
