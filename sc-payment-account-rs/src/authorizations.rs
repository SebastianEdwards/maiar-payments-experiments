#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub use crate::assets::*;
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
  pub authorized_address: Address,
  pub authorized_amount: AuthorizedAmount<BigUint>,
  pub authorized_debits: AuthorizedDebits,
  pub token: TokenIdentifier,
}

#[elrond_wasm_derive::callable(PaymentProcessorProxy)]
pub trait PaymentProcessor {
  fn getUnsettledAmount(&self, authorization_id: BoxedBytes) -> ContractCall<BigUint, BigUint>;
}

#[elrond_wasm_derive::module(AuthorizationsModuleImpl)]
pub trait AuthorizationsModule {
  #[module(AssetsModuleImpl)]
  fn assets(&self) -> AssetsModuleImpl<T, BigInt, BigUint>;

  #[module(UsersModuleImpl)]
  fn users(&self) -> UsersModuleImpl<T, BigInt, BigUint>;

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

    if &self.assets().get_balance(&authorization.token) >= &amount {
      self.assets().send_tokens(&authorization.token, &amount, &authorization.authorized_address);
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

  // storage

  #[storage_mapper("authorizations")]
  fn authorizations(&self) -> MapMapper<Self::Storage, BoxedBytes, PaymentAuthorization<BigUint>>;

  #[storage_mapper("every_x_epochs_payments")]
  fn every_x_epochs_payments(&self, authorization_id: &BoxedBytes) -> LinkedListMapper<Self::Storage, (u64, BigUint)>;
}
