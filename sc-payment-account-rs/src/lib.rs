#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct Card<BigUint: BigUintApi> {
  address: Address,
  id: BoxedBytes,
  limit: BigUint,
  token_type: TokenIdentifier,
}

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct Subscription<BigUint: BigUintApi> {
  address: Address,
  amount: BigUint,
  epochs: u32,
  id: BoxedBytes,
  token_type: TokenIdentifier,
}

#[elrond_wasm_derive::contract(PaymentAccountImpl)]
pub trait PaymentAccount {
	#[init]
	fn init(&self) {
		let my_address: Address = self.blockchain().get_caller();
		self.set_owner(&my_address);
	}

  #[payable("*")]
	#[endpoint]
	fn deposit(&self) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		// TODO: allow shared access to payment account
		require!(caller == self.get_owner(), "Only owner can deposit assets");

		Ok(())
	}

	#[endpoint]
	fn withdraw(&self, amount: BigUint, token: TokenIdentifier) -> SCResult<()> {
		// TODO: check for withdrawal lock if active card authorization
		// TODO: check balance available?

		let caller = self.blockchain().get_caller();

		// TODO: allow shared access to payment account
		require!(caller == self.get_owner(), "Only owner can withdraw assets");

    self.send_tokens(&token, &amount, &caller);

    Ok(())
	}

	#[inline]
	fn send_tokens(&self, token: &TokenIdentifier, amount: &BigUint, destination: &Address) {
		if amount > &0 {
			let _ = self.send().direct_esdt_via_transf_exec(
				destination,
				token.as_esdt_identifier(),
				amount,
				&[],
			);
		}
	}

	// storage

	#[storage_set("owner")]
	fn set_owner(&self, address: &Address);

	#[view]
	#[storage_get("owner")]
	fn get_owner(&self) -> Address;

	#[storage_set("card")]
	fn set_card(&self, card_id: &BoxedBytes, subscription_authorization: &Card<BigUint>);

	#[view]
	#[storage_get("card")]
	fn get_card(&self, card_id: &BoxedBytes) -> Card<BigUint>;

	#[storage_set("subscription")]
	fn set_subscription(&self, subscription_id: &BoxedBytes, subscription_authorization: &Subscription<BigUint>);

	#[view]
	#[storage_get("subscription")]
	fn get_subscription(&self, subscription_id: &BoxedBytes) -> Subscription<BigUint>;
}
