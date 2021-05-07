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

	#[endpoint]
	fn payout(&self, payout_address: Address, token: TokenIdentifier, amount: BigUint) -> SCResult<()> {
		only_owner!(self, "Only owner may payout");

		require!(amount > BigUint::zero(), "Payout amount must be greater than zero");

		let mut total_payable = self.payable_amount(&token).get();

		if total_payable >= amount {
			self.payable_amount(&token).set(&(&total_payable - &amount));

			let _ = self.send().direct_esdt_via_transf_exec(
				&payout_address,
				token.as_esdt_identifier(),
				&amount,
				&[],
			);

			Ok(())
		} else {
			let mut held_amounts = self.held_amounts(&token);

			require!(held_amounts.len() > 0, "No payments awaiting payout for token");

			let current_epoch = self.blockchain().get_block_nonce();

			while match held_amounts.front() { Some((held_until, _)) => held_until >= current_epoch, None => false } {
				total_payable += held_amounts.pop_front().unwrap().1;
			}

			self.payable_amount(&token).set(&(&total_payable - &amount));

			let _ = self.send().direct_esdt_via_transf_exec(
				&payout_address,
				token.as_esdt_identifier(),
				&amount,
				&[],
			);

			Ok(())
		}
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint) -> SCResult<AsyncCall<BigUint>> {
		only_owner!(self, "Only owner may request payment");

		require!(amount > BigUint::zero(), "Requested amount must be greater than zero");

		require!(!self.unsettled_amount(&payment_account_address, &authorization_id).is_empty(), "Already processing payment for this authorization");

		self.unsettled_amount(&payment_account_address, &authorization_id).set(&amount);

		Ok(contract_call!(self, payment_account_address.clone(), PaymentAccountProxy)
			.requestPayment(authorization_id.clone(), amount.clone())
			.async_call()
			.with_callback(self.callbacks().settle_payment(payment_account_address, authorization_id, amount)))
	}

	#[callback]
	fn settle_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint, #[call_result] result: AsyncCallResult<TokenIdentifier>) -> SCResult<()> {
		match result {
			AsyncCallResult::Ok(token) => {
				self.unsettled_amount(&payment_account_address, &authorization_id).clear();

				self.held_amounts(&token).push_back((self.blockchain().get_block_nonce() + PAYMENT_HOLD_PERIOD, amount));

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
	fn held_amounts(&self, token: &TokenIdentifier) -> LinkedListMapper<Self::Storage, (u64, BigUint)>;

	#[storage_mapper("payable_amount")]
	fn payable_amount(&self, token: &TokenIdentifier) -> SingleValueMapper<Self::Storage, BigUint>;

	#[view(getUnsettledAmount)]
	#[storage_mapper("unsettled_amount")]
	fn unsettled_amount(&self, payment_account_address: &Address, authorization_id: &BoxedBytes) -> SingleValueMapper<Self::Storage, BigUint>;
}
