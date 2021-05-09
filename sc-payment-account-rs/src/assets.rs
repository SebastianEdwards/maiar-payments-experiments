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
    require!(self.users().current().can_withdraw(), "Not allowed to withdraw assets");

    let caller = self.blockchain().get_caller();

    // TODO: Check all withdrawal locks.
    // Iteration 1: block if any active.
    // Iteration 2: normalize value of locks and total assets into withdrawal token and ensure total assets minus withdrawal amount doesn't exceed value of locks (factor in margin of error for slippage)

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
      let _ = self.send().direct(
        destination,
        token,
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
