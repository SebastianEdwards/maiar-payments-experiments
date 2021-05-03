#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, PartialEq, TypeAbi)]
pub struct WithdrawalLockKey {
	payment_account_address: Address,
	authorization_id: BoxedBytes,
}

#[elrond_wasm_derive::callable(PaymentAccountProxy)]
pub trait PaymentAccount {
	fn requestPayment(&self, authorization_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> ContractCall<BigUint, ()>;
}

#[elrond_wasm_derive::contract(PaymentProcessorImpl)]
pub trait PaymentProcessor {
	#[init]
	fn init(&self) {
		let my_address: Address = self.blockchain().get_caller();
		self.owner().set(&my_address);
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> SCResult<()> {
		only_owner!(self, "Only owner may request payment");

		let withdrawal_lock_key = WithdrawalLockKey {
			authorization_id: authorization_id.clone(),
			payment_account_address: payment_account_address.clone(),
		};

		require!(!self.withdrawal_locks().contains_key(&withdrawal_lock_key), "Already processing payment for this authorization");

		self.withdrawal_locks().insert(withdrawal_lock_key, amount.clone());

		let payment_account = contract_call!(self, payment_account_address, PaymentAccountProxy);

		payment_account
			.requestPayment(authorization_id, amount, payment_id)
			.execute_on_dest_context(self.blockchain().get_gas_left(), self.send());

		// TODO: Remove withdrawal lock after callback success

		Ok(())
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[storage_mapper("withdrawal_locks")]
	fn withdrawal_locks(&self) -> MapMapper<Self::Storage, WithdrawalLockKey, BigUint>;
}
