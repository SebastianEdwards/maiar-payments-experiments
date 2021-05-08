#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub mod migrations;
pub mod users;

pub use crate::migrations::*;
pub use crate::users::*;

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, TypeAbi, Clone, Copy, PartialEq)]
pub enum AuthorizedAmount<BigUint: BigUintApi> {
	Fixed(BigUint),
	FixedEveryPayment(BigUint),
	FixedEveryXEpochs(BigUint, u64),
	Unlimited,
}

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, TypeAbi, Clone, Copy, PartialEq)]
pub enum AuthorizedDebits {
	Fixed(u32),
	Unlimited,
}

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct PaymentAuthorization<BigUint: BigUintApi> {
  authorized_address: Address,
  authorized_amount: AuthorizedAmount<BigUint>,
	authorized_debits: AuthorizedDebits,
  token: TokenIdentifier,
}

#[elrond_wasm_derive::callable(PaymentProcessorProxy)]
pub trait PaymentProcessor {
	fn getUnsettledAmount(&self, authorization_id: BoxedBytes) -> ContractCall<BigUint, BigUint>;
}

#[elrond_wasm_derive::contract(PaymentAccountImpl)]
pub trait PaymentAccount {
	#[module(MigrationsModuleImpl)]
	fn migrations(&self) -> MigrationsModuleImpl<T, BigInt, BigUint>;

	#[module(UsersModuleImpl)]
	fn users(&self) -> UsersModuleImpl<T, BigInt, BigUint>;

	#[init]
	fn init(&self) {
		let user_id = self.users().user_storage().get_or_create_user(&self.blockchain().get_caller());
		self.users().set_role_for_user_id(user_id, UserRole::Manager);

		self.migrations().migrated().set(&false);
	}

  #[payable("*")]
	#[endpoint]
	fn deposit(&self, #[payment] amount: BigUint, #[payment_token] token: TokenIdentifier) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().current().can_deposit(), "Not allowed to deposit assets");

		self.known_tokens().insert(token.clone());

		self.deposit_made_event(&caller, &token, &amount);

		Ok(())
	}

	#[endpoint]
	fn authorize(&self, authorization_id: BoxedBytes, authorized_address: Address, authorized_amount: AuthorizedAmount<BigUint>, authorized_debits: AuthorizedDebits, token: TokenIdentifier) -> SCResult<()> {
		require!(self.users().current().can_authorize(), "Not allowed to authorize payments");

		let authorization = PaymentAuthorization::<BigUint> {
			authorized_address: authorized_address,
			authorized_amount: authorized_amount,
			authorized_debits: authorized_debits,
			token: token,
		};

		self.authorizations().insert(authorization_id, authorization);

		Ok(())
	}

	#[endpoint(cancelAuthorization)]
	fn cancel_authorization(&self, authorization_id: BoxedBytes) -> SCResult<AsyncCall<BigUint>> {
		match self.authorizations().get(&authorization_id) {
			Some(authorization) => {
				let caller = self.blockchain().get_caller();

				require!(self.users().current().can_authorize() || caller == authorization.authorized_address, "Not allowed to cancel authorization");

				Ok(contract_call!(self, authorization.authorized_address, PaymentProcessorProxy)
					.getUnsettledAmount(authorization_id.clone())
					.async_call()
					.with_callback(self.callbacks().remove_authorization(authorization_id)))
			},
			None => sc_error!("Invalid authorization id")
		}
	}

	#[callback]
	fn remove_authorization(&self, authorization_id: BoxedBytes, #[call_result] result: AsyncCallResult<BigUint>) -> SCResult<()> {
		match result {
			AsyncCallResult::Ok(amount) => {
				require!(amount == BigUint::zero(), "Authorization has outstanding unsettled amount");

				self.authorizations().remove(&authorization_id);

				Ok(())
			},
			AsyncCallResult::Err(message) => Err(message.err_msg.into())
		}
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, authorization_id: BoxedBytes, amount: BigUint) -> SCResult<TokenIdentifier> {
		let caller = self.blockchain().get_caller();

		require!(self.authorizations().contains_key(&authorization_id), "Invalid authorization id");

		let authorization: PaymentAuthorization<BigUint> = self.authorizations().get(&authorization_id).unwrap();

		require!(caller == authorization.authorized_address, "Only authorized_address can request payment");

		match authorization.authorized_amount {
			AuthorizedAmount::Fixed(ref remaining_amount) => require!(remaining_amount > &amount, "Amount requested greater than authorized amount"),
			AuthorizedAmount::FixedEveryPayment(ref limit) => require!(limit >= &amount, "Amount requested greater than authorized amount"),
			AuthorizedAmount::FixedEveryXEpochs(ref amount_every, epochs) => {
				require!(amount_every >= &amount, "Amount requested greater than authorized amount");

				let mut previous_epoch_amount_list = self.every_x_epochs_payments(&authorization_id);

				if previous_epoch_amount_list.len() > 0 {
					let current_epoch = self.blockchain().get_block_epoch();
					let start_of_period = current_epoch - epochs;

					while match previous_epoch_amount_list.front() { Some((epoch, _)) => epoch < start_of_period, None => false } {
						previous_epoch_amount_list.pop_front();
					}

					let previous_total = previous_epoch_amount_list.iter().fold(BigUint::zero(), |acc, (_, amount)| acc + amount);

					previous_epoch_amount_list.push_back((current_epoch, amount.clone()));

					require!(amount_every - &previous_total >= amount, "Amount requested greater than authorized amount")
				} else {
					require!(true, "Always passes")
				}
			},
			AuthorizedAmount::Unlimited => require!(true, "Always passes")
		}

		if &self.get_balance(&authorization.token) >= &amount {
			self.send_tokens(&authorization.token, &amount, &authorization.authorized_address);
		} else {
			// TODO: Actual conversion of tokens into settlement currency as required or fail
		}

		if authorization.authorized_amount != AuthorizedAmount::Unlimited || authorization.authorized_debits != AuthorizedDebits::Unlimited {
			let new_authorized_amount = match authorization.authorized_amount {
				AuthorizedAmount::Fixed(remaining_amount) => AuthorizedAmount::Fixed(remaining_amount - amount),
				AuthorizedAmount::FixedEveryPayment(limit) => AuthorizedAmount::FixedEveryPayment(limit),
				AuthorizedAmount::FixedEveryXEpochs(amount_every, epochs) => AuthorizedAmount::FixedEveryXEpochs(amount_every, epochs),
				AuthorizedAmount::Unlimited => AuthorizedAmount::Unlimited
			};

			let new_authorized_debits = match authorization.authorized_debits {
				AuthorizedDebits::Fixed(remaining) => AuthorizedDebits::Fixed(remaining - 1),
				AuthorizedDebits::Unlimited => AuthorizedDebits::Unlimited
			};

			if new_authorized_amount == AuthorizedAmount::Fixed(BigUint::zero()) || new_authorized_debits == AuthorizedDebits::Fixed(0) {
				self.authorizations().remove(&authorization_id);
			} else {
				let new_authorization = PaymentAuthorization::<BigUint> {
					authorized_address: authorization.authorized_address,
					authorized_amount: new_authorized_amount,
					authorized_debits: new_authorized_debits,
					token: authorization.token.clone(),
				};

				self.authorizations().insert(authorization_id, new_authorization);
			}
		}

		Ok(authorization.token)
	}

	#[inline]
	fn get_balance(&self, token: &TokenIdentifier) -> BigUint {
		if token == &TokenIdentifier::egld() {
			self.blockchain().get_balance(&self.blockchain().get_sc_address())
		} else {
			self.blockchain().get_esdt_balance(&self.blockchain().get_sc_address(), token.as_esdt_identifier(), 0)
		}
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

	#[endpoint]
	fn withdraw(&self, amount: BigUint, token: TokenIdentifier) -> SCResult<()> {
		require!(self.users().current().can_authorize(), "Not allowed to withdraw assets");

		let caller = self.blockchain().get_caller();

		// if (self.cards().len() > 0) {
		// 	for card in self.cards().values() {
		// 		// TODO: check for withdrawal lock if active card authorization
		// 		// TODO: figure out how to maintain state of previous checks inside multiple async callbacks
		// 	}
		// }

		// TODO: If one or more withdrawal locks: ensure balance of assets minus locked amounts does not exceed withdrawal requests (factor in margin of error for slippage)
		// May require oracle price checks? Do calculation at UI layer first to reduce wastage

    self.send_tokens(&token, &amount, &caller);

    Ok(())
	}

	// events

	#[event("deposit_made")]
	fn deposit_made_event(&self, #[indexed] depositor: &Address, #[indexed] token: &TokenIdentifier, amount: &BigUint);

	// storage

	#[storage_mapper("authorizations")]
	fn authorizations(&self) -> MapMapper<Self::Storage, BoxedBytes, PaymentAuthorization<BigUint>>;

	#[storage_mapper("every_x_epochs_payments")]
	fn every_x_epochs_payments(&self, authorization_id: &BoxedBytes) -> LinkedListMapper<Self::Storage, (u64, BigUint)>;

	#[storage_mapper("known_tokens")]
	fn known_tokens(&self) -> SetMapper<Self::Storage, TokenIdentifier>;
}
