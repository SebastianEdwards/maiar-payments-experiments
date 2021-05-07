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

	#[endpoint]
	fn payout(&self, payout_address: Address, token: TokenIdentifier, amount: BigUint) -> SCResult<()> {
		only_owner!(self, "Only owner may payout");

		require!(amount > BigUint::zero(), "Payout amount must be greater than zero");

		let mut total_payoutable = match self.payable_amounts().get(&token) { Some(payoutable) => payoutable, None => BigUint::zero() };

		if total_payoutable >= amount {
			self.payable_amounts().insert(token.clone(), &total_payoutable - &amount);

			let _ = self.send().direct_esdt_via_transf_exec(
				&payout_address,
				token.as_esdt_identifier(),
				&amount,
				&[],
			);

			Ok(())
		} else {
			match self.held_amounts().get(&token) {
				Some(mut held_amounts) => {
					let current_epoch = self.blockchain().get_block_nonce();

					while match held_amounts.front() { Some((held_until, _)) => held_until >= current_epoch, None => false } {
						total_payoutable += held_amounts.pop_front().unwrap().1;
					}

					self.payable_amounts().insert(token.clone(), &total_payoutable - &amount);

					let _ = self.send().direct_esdt_via_transf_exec(
						&payout_address,
						token.as_esdt_identifier(),
						&amount,
						&[],
					);

					Ok(())
				},
				None => sc_error!("No payments awaiting payout for token")
			}
		}
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint) -> SCResult<AsyncCall<BigUint>> {
		only_owner!(self, "Only owner may request payment");

		require!(amount > BigUint::zero(), "Requested amount must be greater than zero");

		let withdrawal_lock_key = WithdrawalLockKey {
			authorization_id: authorization_id.clone(),
			payment_account_address: payment_account_address.clone(),
		};

		require!(!self.withdrawal_locks().contains_key(&withdrawal_lock_key), "Already processing payment for this authorization");

		self.withdrawal_locks().insert(withdrawal_lock_key, amount.clone());

		Ok(contract_call!(self, payment_account_address.clone(), PaymentAccountProxy)
			.requestPayment(authorization_id.clone(), amount.clone())
			.async_call()
			.with_callback(self.callbacks().settle_payment(payment_account_address, authorization_id, amount)))
	}

	#[callback]
	fn settle_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint, #[call_result] result: AsyncCallResult<TokenIdentifier>) -> SCResult<()> {
		match result {
			AsyncCallResult::Ok(token) => {
				let withdrawal_lock_key = WithdrawalLockKey {
					authorization_id: authorization_id,
					payment_account_address: payment_account_address,
				};

				self.withdrawal_locks().remove(&withdrawal_lock_key);

				self.held_amounts().entry(token).or_default().update( |held_amounts_list| held_amounts_list.push_back((self.blockchain().get_block_nonce() + PAYMENT_HOLD_PERIOD, amount)) );

				Ok(())
			},
			AsyncCallResult::Err(message) => Err(message.err_msg.into())
		}
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[storage_mapper("held_amounts")]
	fn held_amounts(&self) -> MapStorageMapper<Self::Storage, TokenIdentifier, LinkedListMapper<Self::Storage, (u64, BigUint)>>;

	#[storage_mapper("payable_amounts")]
	fn payable_amounts(&self) -> MapMapper<Self::Storage, TokenIdentifier, BigUint>;

	#[storage_mapper("withdrawal_locks")]
	fn withdrawal_locks(&self) -> MapMapper<Self::Storage, WithdrawalLockKey, BigUint>;
}
