#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub use crate::authorizations::*;
pub use crate::users::*;

#[elrond_wasm_derive::module(AssetsModuleImpl)]
pub trait AssetsModule {
	#[module(AuthorizationsModuleImpl)]
	fn authorizations(&self) -> AuthorizationsModuleImpl<T, BigInt, BigUint>;

	#[module(UsersModuleImpl)]
	fn users(&self) -> UsersModuleImpl<T, BigInt, BigUint>;

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

	// events

	#[event("deposit_made")]
	fn deposit_made_event(&self, #[indexed] depositor: &Address, #[indexed] token: &TokenIdentifier, amount: &BigUint);

	// storage

	#[storage_mapper("known_tokens")]
	fn known_tokens(&self) -> SetMapper<Self::Storage, TokenIdentifier>;
}
