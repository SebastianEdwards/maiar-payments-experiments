#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, PartialEq, TypeAbi)]
pub struct WithdrawalLockKey {
	authorization_id: BoxedBytes,
	payment_account_address: Address,
}

#[derive(TopEncode, TopDecode, PartialEq, TypeAbi)]
pub struct Payment<BigUint: BigUintApi> {
	amount: BigUint,
	held_until: u64,
	token: TokenIdentifier,
}

const PAYMENT_HOLD_PERIOD: u64 = 10 * 60 * 24;

#[elrond_wasm_derive::callable(PaymentAccountProxy)]
pub trait PaymentAccount {
	fn requestPayment(&self, authorization_id: BoxedBytes, amount: BigUint) -> ContractCall<BigUint, TokenIdentifier>;
}

#[elrond_wasm_derive::contract(PaymentProcessorImpl)]
pub trait PaymentProcessor {
	#[init]
	fn init(&self) {
		let my_address: Address = self.blockchain().get_caller();
		self.owner().set(&my_address);
	}

	#[endpoint(getLockedAmount)]
	fn get_locked_amount(&self, authorization_id: BoxedBytes) -> SCResult<BigUint> {
		let withdrawal_lock_key = WithdrawalLockKey {
			authorization_id: authorization_id,
			payment_account_address: self.blockchain().get_caller(),
		};

		match self.withdrawal_locks().get(&withdrawal_lock_key) {
			Some(locked_amount) => Ok(locked_amount),
			None => Ok(BigUint::zero())
		}
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> SCResult<AsyncCall<BigUint>> {
		only_owner!(self, "Only owner may request payment");

		let withdrawal_lock_key = WithdrawalLockKey {
			authorization_id: authorization_id.clone(),
			payment_account_address: payment_account_address.clone(),
		};

		require!(!self.withdrawal_locks().contains_key(&withdrawal_lock_key), "Already processing payment for this authorization");

		self.withdrawal_locks().insert(withdrawal_lock_key, amount.clone());

		Ok(contract_call!(self, payment_account_address.clone(), PaymentAccountProxy)
			.requestPayment(authorization_id.clone(), amount.clone())
			.async_call()
			.with_callback(self.callbacks().settle_payment(payment_account_address, authorization_id, amount, payment_id)))
	}

	#[callback]
	fn settle_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes, #[call_result] result: AsyncCallResult<TokenIdentifier>) -> SCResult<()> {
		match result {
			AsyncCallResult::Ok(token) => {
				let withdrawal_lock_key = WithdrawalLockKey {
					authorization_id: authorization_id,
					payment_account_address: payment_account_address,
				};

				self.withdrawal_locks().remove(&withdrawal_lock_key);

				let payment = Payment::<BigUint> {
					amount: amount,
					held_until: self.blockchain().get_block_nonce() + PAYMENT_HOLD_PERIOD,
					token: token,
				};

				self.payments().insert(payment_id, payment);

				Ok(())
			},
			AsyncCallResult::Err(message) => Err(message.err_msg.into())
		}
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[storage_mapper("payments")]
	fn payments(&self) -> MapMapper<Self::Storage, BoxedBytes, Payment<BigUint>>;

	#[storage_mapper("withdrawal_locks")]
	fn withdrawal_locks(&self) -> MapMapper<Self::Storage, WithdrawalLockKey, BigUint>;
}
