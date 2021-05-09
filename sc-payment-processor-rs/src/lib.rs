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

const MINIMUM_STAKE:        u64 = 5_000_000_000_000_000_000; // 5 EGLD
const PAYMENT_HOLD_PERIOD:  u64 = 10 * 60 * 24; // ~24 hours
const EARLY_PAYOUT_PENALTY: u64 = 500_000_000_000_000_000; // 0.5 EGLD

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

	#[view(getUnsettledAmount)]
	fn get_unsettled_amount(&self, authorization_id: &BoxedBytes) -> BigUint {
		self.unsettled_amount(&self.blockchain().get_caller(), &authorization_id).get()
	}

	#[endpoint]
	fn payout(&self, payout_address: Address, token: TokenIdentifier, amount: BigUint) -> SCResult<()> {
		only_owner!(self, "Only owner may payout");

		require!(amount > BigUint::zero(), "Payout amount must be greater than zero");

		require!(self.is_staked(), "Contract not sufficiently staked");

		let mut total_payable = self.payable_amount(&token).get();

		if total_payable < amount {
			let mut held_amounts = self.held_amounts(&token);

			require!(held_amounts.len() > 0, "No payments awaiting payout for token");

			let current_epoch = self.blockchain().get_block_nonce();

			while match held_amounts.front() { Some((held_until, _)) => held_until >= current_epoch, None => false } {
				total_payable += held_amounts.pop_front().unwrap().1;
			}
		}

		if total_payable >= amount {
			self.payable_amount(&token).set(&(&total_payable - &amount));

			self.send_tokens(&token, &amount, &payout_address);
		} else {
			self.payable_amount(&token).set(&total_payable);

			self.staked_amount().set(&(self.staked_amount().get() - BigUint::from(EARLY_PAYOUT_PENALTY)));

			// TODO: Actually send slashed amount somewhere useful like community fund
		}

		Ok(())
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_account_address: Address, authorization_id: BoxedBytes, amount: BigUint) -> SCResult<AsyncCall<BigUint>> {
		only_owner!(self, "Only owner may request payment");

		require!(self.is_staked(), "Contract not sufficiently staked");

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

	#[payable("EGLD")]
	#[endpoint]
	fn stake(&self, #[payment] amount: BigUint) -> SCResult<()> {
		only_owner!(self, "Only owner may stake");

		require!(amount > BigUint::zero(), "Stake amount must be greater than zero");

		self.staked_amount().set(&(self.staked_amount().get() + amount));

		Ok(())
	}

	#[view(isStaked)]
	fn is_staked(&self) -> bool {
		self.staked_amount().get() >= BigUint::from(MINIMUM_STAKE)
	}

	#[inline]
	fn send_tokens(&self, token: &TokenIdentifier, amount: &BigUint, destination: &Address) {
		if amount > &0 {
			let _ = self.send().direct(
				destination,
				token,
				amount,
				&[],
			);
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

	#[view(getStakedAmount)]
	#[storage_mapper("staked_amount")]
	fn staked_amount(&self) -> SingleValueMapper<Self::Storage, BigUint>;

	#[storage_mapper("unsettled_amount")]
	fn unsettled_amount(&self, payment_account_address: &Address, authorization_id: &BoxedBytes) -> SingleValueMapper<Self::Storage, BigUint>;
}
