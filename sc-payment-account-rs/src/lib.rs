#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub mod payment_processor_proxy_v0;
pub mod users;

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

#[elrond_wasm_derive::contract]
pub trait PaymentAccount:
    users::UsersModule
{
  #[init]
  fn init(&self) {
    let user_id = self.user_storage().get_or_create_user(&self.blockchain().get_caller());
    self.set_role_for_user_id(user_id, UserRole::Manager);
  }

  #[endpoint]
  fn authorize(&self, authorization_id: BoxedBytes, authorized_address: Address, authorized_amount: AuthorizedAmount<Self::BigUint>, authorized_debits: AuthorizedDebits, token: TokenIdentifier) -> SCResult<()> {
    require!(self.current().can_authorize(), "Not allowed to authorize payments");

    let authorization = PaymentAuthorization::<Self::BigUint> {
      authorized_address: authorized_address,
      authorized_amount: authorized_amount,
      authorized_debits: authorized_debits,
      token: token,
    };

    self.authorizations().insert(authorization_id, authorization);

    Ok(())
  }

  #[endpoint(cancelAuthorization)]
  fn cancel_authorization(&self, authorization_id: BoxedBytes) -> SCResult<AsyncCall<Self::SendApi>> {
    match self.authorizations().get(&authorization_id) {
      Some(authorization) => {
        let caller = self.blockchain().get_caller();

        require!(self.current().can_authorize() || caller == authorization.authorized_address, "Not allowed to cancel authorization");

        Ok(
          self.payment_processor_proxy_v0(authorization.authorized_address)
            .get_unsettled_amount(authorization_id.clone())
            .async_call()
            .with_callback(self.callbacks().remove_authorization(authorization_id))
        )
      },
      None => sc_error!("Invalid authorization id")
    }
  }

  #[endpoint(deployContract)]
  fn deploy_contract(&self, new_code: BoxedBytes) -> SCResult<Address> {
    require!(self.current().can_migrate(), "Not allowed to deploy new contract");

    require!(!self.migrated().get(), "Already migrated");

    let new_contract = self.send().deploy_contract(
      self.blockchain().get_gas_left(),
      &Self::BigUint::zero(),
      &new_code,
      CodeMetadata::DEFAULT,
      &ArgBuffer::new(),
    );

    self.migrating_to().set(&new_contract);

    Ok(new_contract)
  }

  #[payable("*")]
  #[endpoint]
  fn deposit(&self, #[payment] amount: Self::BigUint, #[payment_token] token: TokenIdentifier) -> SCResult<()> {
    let caller = self.blockchain().get_caller();

    // require!(self.users().current().can_deposit(), "Not allowed to deposit assets");

    self.known_tokens().insert(token.clone());

    self.deposit_made_event(&caller, &token, &amount);

    Ok(())
  }

  #[endpoint]
  fn migrate(&self) -> SCResult<()> {
    require!(self.current().can_migrate(), "Not allowed to migrate");

    require!(!self.migrated().get(), "Already migrated");

    // TODO: Check unsettled funds

    let new_contract = self.migrating_to().get();

    // Start migration

    self.payment_account_proxy_v0(new_contract.clone())
      .migrate_start()
      .execute_on_dest_context(self.blockchain().get_gas_left());

    // Migrate users

    let mut migrate_users = ContractCall::<Self::SendApi, ()>::new(self.send(), new_contract.clone(), BoxedBytes::from(&b"migrateUsers"[..]));
    let user_arg_buffer = migrate_users.get_mut_arg_buffer();

    for user_id in 1..self.user_storage().get_user_count() {
      let address = self.user_storage().get_user_address(user_id).unwrap();
      let role = self.get_role_for_user_id(user_id);

      if role != UserRole::None {
        let args = MultiArg2::<Address, UserRole>::from((address, role));

        let _ = args.push_async_arg(user_arg_buffer);
      }
    }

    migrate_users.execute_on_dest_context(self.blockchain().get_gas_left());

    // Migrate authorizations
    // TODO: Skip this step if no authorizations

    let mut migrate_authorizations = ContractCall::<Self::SendApi, ()>::new(self.send(), new_contract.clone(), BoxedBytes::from(&b"migrateAuthorizations"[..]));
    let authorization_arg_buffer = migrate_authorizations.get_mut_arg_buffer();

    for authorization_id in self.authorizations().keys() {
      let authorization = self.authorizations().get(&authorization_id).unwrap();

      let args = MultiArg5::<BoxedBytes, Address, AuthorizedAmount<Self::BigUint>, AuthorizedDebits, TokenIdentifier>::from((
        authorization_id,
        authorization.authorized_address,
        authorization.authorized_amount,
        authorization.authorized_debits,
        authorization.token,
      ));

      let _ = args.push_async_arg(authorization_arg_buffer);
    }

    migrate_authorizations.execute_on_dest_context(self.blockchain().get_gas_left());

    // Migrate every X epochs payments
    // TODO: Skip this step if no authorizations with EveryXEpochs authorized amount

    let mut migrate_every_x_epochs_payments = ContractCall::<Self::SendApi, ()>::new(self.send(), new_contract.clone(), BoxedBytes::from(&b"migrateEveryXEpochsPayments"[..]));
    let every_x_epochs_payments_arg_buffer = migrate_every_x_epochs_payments.get_mut_arg_buffer();

    for authorization_id in self.authorizations().keys() {
      for (block_epoch, payment_amount) in self.every_x_epochs_payments(&authorization_id).iter() {
        let args = MultiArg3::<BoxedBytes, u64, Self::BigUint>::from((
          authorization_id.clone(),
          block_epoch,
          payment_amount,
        ));

        let _ = args.push_async_arg(every_x_epochs_payments_arg_buffer);
      }
    }

    migrate_every_x_epochs_payments.execute_on_dest_context(self.blockchain().get_gas_left());

    // Migrate assets

    let zero = Self::BigUint::zero();
    for asset in self.known_tokens().iter() {
      let balance = self.get_balance(&asset);

      if balance > zero {
        self.payment_account_proxy_v0(new_contract.clone())
          .with_token_transfer(asset.clone(), self.get_balance(&asset))
          .migrate_asset(asset.clone())
          .execute_on_dest_context(self.blockchain().get_gas_left());
      }
    }

    // End migration

    self.payment_account_proxy_v0(new_contract.clone())
      .migrate_end()
      .execute_on_dest_context(self.blockchain().get_gas_left());

    self.migrated().set(&true);
    self.migrated_to().set(&new_contract);

    Ok(())
  }

  #[endpoint(startMigration)]
  fn migrate_start(&self) -> SCResult<()> {
    let caller = self.blockchain().get_caller();
    require!(&caller == &self.blockchain().get_owner_address(), "Only owner may start migration");

    require!(self.blockchain().is_smart_contract(&caller), "Must be called from previous contract");

    self.migrating().set(&true);

    self.migrated_from().set(&caller);

    let user_id = self.user_storage().get_or_create_user(&caller);
    self.set_role_for_user_id(user_id, UserRole::None);

    Ok(())
  }

  #[endpoint(migrateUsers)]
  fn migrate_users(&self, #[var_args] user_data: VarArgs<MultiArg2<Address, UserRole>>) -> SCResult<()> {
    let caller = self.blockchain().get_caller();

    require!(self.migrating().get(), "Migration not in progress");

    require!(caller == self.migrated_from().get(), "Must be called from previous contract");

    user_data.into_vec().into_iter().for_each(|var_args| {
      let (address, role) = var_args.into_tuple();

      let user_id = self.user_storage().get_or_create_user(&address);
      self.set_role_for_user_id(user_id, role);
    } );

    Ok(())
  }

  #[endpoint(migrateAuthorizations)]
  fn migrate_authorizations(&self, #[var_args] authorization_data: VarArgs<MultiArg5<BoxedBytes, Address, AuthorizedAmount<Self::BigUint>, AuthorizedDebits, TokenIdentifier>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    authorization_data.into_vec().into_iter().for_each(|var_args| {
      let (authorization_id, authorized_address, authorized_amount, authorized_debits, token) = var_args.into_tuple();

      let authorization = PaymentAuthorization::<Self::BigUint> {
        authorized_address: authorized_address,
        authorized_amount: authorized_amount,
        authorized_debits: authorized_debits,
        token: token,
      };

      self.authorizations().insert(authorization_id, authorization);
    } );

    Ok(())
  }

  #[endpoint(migrateEveryXEpochsPayments)]
  fn migrate_every_x_epochs_payments(&self, #[var_args] every_x_epochs_payments_data: VarArgs<MultiArg3<BoxedBytes, u64, Self::BigUint>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    every_x_epochs_payments_data.into_vec().into_iter().for_each(|var_args| {
      let (authorization_id, block_epoch, payment_amount) = var_args.into_tuple();

      self.every_x_epochs_payments(&authorization_id).push_back((block_epoch, payment_amount));
    } );

    Ok(())
  }

  #[payable("*")]
  #[endpoint(migrateAsset)]
  fn migrate_asset(&self, #[payment_token] token: TokenIdentifier) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    self.known_tokens().insert(token.clone());

    Ok(())
  }

  #[endpoint(endMigration)]
  fn migrate_end(&self) -> SCResult<()> {
    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    self.migrating().set(&false);

    Ok(())
  }

  #[callback]
  fn remove_authorization(&self, authorization_id: BoxedBytes, #[call_result] result: AsyncCallResult<Self::BigUint>) -> SCResult<()> {
    match result {
      AsyncCallResult::Ok(amount) => {
        require!(amount == Self::BigUint::zero(), "Authorization has outstanding unsettled amount");

        self.authorizations().remove(&authorization_id);

        Ok(())
      },
      AsyncCallResult::Err(message) => Err(message.err_msg.into())
    }
  }

  #[endpoint(requestPayment)]
  fn request_payment(&self, authorization_id: BoxedBytes, amount: Self::BigUint) -> SCResult<TokenIdentifier> {
    let caller = self.blockchain().get_caller();

    require!(self.authorizations().contains_key(&authorization_id), "Invalid authorization id");

    let authorization: PaymentAuthorization<Self::BigUint> = self.authorizations().get(&authorization_id).unwrap();

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

          let previous_total = previous_epoch_amount_list.iter().fold(Self::BigUint::zero(), |acc, (_, amount)| acc + amount);

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

      if new_authorized_amount == AuthorizedAmount::Fixed(Self::BigUint::zero()) || new_authorized_debits == AuthorizedDebits::Fixed(0) {
        self.authorizations().remove(&authorization_id);
      } else {
        let new_authorization = PaymentAuthorization::<Self::BigUint> {
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

  #[endpoint]
  fn withdraw(&self, amount: Self::BigUint, token: TokenIdentifier) -> SCResult<()> {
    // require!(self.users().current().can_withdraw(), "Not allowed to withdraw assets");

    let caller = self.blockchain().get_caller();

    // TODO: Check all withdrawal locks.
    // Iteration 1: block if any active.
    // Iteration 2: normalize value of locks and total assets into withdrawal token and ensure total assets minus withdrawal amount doesn't exceed value of locks (factor in margin of error for slippage)

    self.send_tokens(&token, &amount, &caller);

    Ok(())
  }

  #[inline]
  fn get_balance(&self, token: &TokenIdentifier) -> Self::BigUint {
    if token == &TokenIdentifier::egld() {
      self.blockchain().get_balance(&self.blockchain().get_sc_address())
    } else {
      self.blockchain().get_esdt_balance(&self.blockchain().get_sc_address(), token.as_esdt_identifier(), 0)
    }
  }

  #[inline]
  fn send_tokens(&self, token: &TokenIdentifier, amount: &Self::BigUint, destination: &Address) {
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
  fn deposit_made_event(&self, #[indexed] depositor: &Address, #[indexed] token: &TokenIdentifier, amount: &Self::BigUint);

  // proxies

  #[proxy]
  fn payment_account_proxy_v0(&self, to: Address) -> crate::Proxy<Self::SendApi>;

  #[proxy]
  fn payment_processor_proxy_v0(&self, to: Address) -> payment_processor_proxy_v0::Proxy<Self::SendApi>;

  // storage

  #[storage_mapper("authorizations")]
  fn authorizations(&self) -> MapMapper<Self::Storage, BoxedBytes, PaymentAuthorization<Self::BigUint>>;

  #[storage_mapper("every_x_epochs_payments")]
  fn every_x_epochs_payments(&self, authorization_id: &BoxedBytes) -> LinkedListMapper<Self::Storage, (u64, Self::BigUint)>;

  #[storage_mapper("known_tokens")]
  fn known_tokens(&self) -> SetMapper<Self::Storage, TokenIdentifier>;

  #[view(migated)]
  #[storage_mapper("migrated")]
  fn migrated(&self) -> SingleValueMapper<Self::Storage, bool>;

  #[view(migratedFrom)]
  #[storage_mapper("migrated_from")]
  fn migrated_from(&self) -> SingleValueMapper<Self::Storage, Address>;

  #[view(migratedTo)]
  #[storage_mapper("migrated_to")]
  fn migrated_to(&self) -> SingleValueMapper<Self::Storage, Address>;

  #[view(migrating)]
  #[storage_mapper("migrating")]
  fn migrating(&self) -> SingleValueMapper<Self::Storage, bool>;

  #[storage_mapper("migrating_to")]
  fn migrating_to(&self) -> SingleValueMapper<Self::Storage, Address>;
}
