elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub use crate::assets::*;
pub use crate::authorizations::*;
pub use crate::users::*;

#[elrond_wasm_derive::callable(PaymentAccountProxy)]
pub trait PaymentAccount {
  fn startMigration(&self) -> ContractCall<BigUint, ()>;
  fn migrateAsset(&self) -> ContractCall<BigUint, ()>;
  fn endMigration(&self) -> ContractCall<BigUint, ()>;
}

#[elrond_wasm_derive::module(MigrationsModuleImpl)]
pub trait MigrationsModule {
  #[module(AssetsModuleImpl)]
  fn assets(&self) -> AssetsModuleImpl<T, BigInt, BigUint>;

  #[module(AuthorizationsModuleImpl)]
  fn authorizations(&self) -> AuthorizationsModuleImpl<T, BigInt, BigUint>;

  #[module(UsersModuleImpl)]
  fn users(&self) -> UsersModuleImpl<T, BigInt, BigUint>;

  // migration initiator code

  #[endpoint(deployContract)]
  fn deploy_contract(&self, new_code: BoxedBytes) -> SCResult<Address> {
    require!(self.users().current().can_migrate(), "Not allowed to deploy new contract");

    require!(!self.migrated().get(), "Already migrated");

    let new_contract = self.send().deploy_contract(
      self.blockchain().get_gas_left(),
      &BigUint::zero(),
      &new_code,
      CodeMetadata::DEFAULT,
      &ArgBuffer::new(),
    );

    self.migrating_to().set(&new_contract);

    Ok(new_contract)
  }

  #[endpoint]
  fn migrate(&self) -> SCResult<()> {
    require!(self.users().current().can_migrate(), "Not allowed to migrate");

    require!(!self.migrated().get(), "Already migrated");

    // TODO: Check unsettled funds

    let new_contract = self.migrating_to().get();

    contract_call!(self, new_contract.clone(), PaymentAccountProxy)
      .startMigration()
      .execute_on_dest_context(self.blockchain().get_gas_left(), self.send());

    self.send_users(new_contract.clone());
    // TODO: Skip this step if no authorizations
    self.send_authorizations(new_contract.clone());
    // TODO: Skip this step if no authorizations with EveryXEpochs authorized amount
    self.send_every_x_epochs_payments(new_contract.clone());

    let zero = BigUint::zero();
    for asset in self.assets().known_tokens().iter() {
      let balance = self.assets().get_balance(&asset);

      if balance > zero {
        contract_call!(self, new_contract.clone(), PaymentAccountProxy)
          .with_token_transfer(asset.clone(), self.assets().get_balance(&asset))
          .migrateAsset()
          .execute_on_dest_context(self.blockchain().get_gas_left(), self.send());
      }
    }

    contract_call!(self, new_contract.clone(), PaymentAccountProxy)
      .endMigration()
      .execute_on_dest_context(self.blockchain().get_gas_left(), self.send());

    self.migrated().set(&true);
    self.migrated_to().set(&new_contract);

    Ok(())
  }

  fn send_users(&self, new_contract: Address) {
    let mut contract_call = ContractCall::<BigUint, ()>::new(
      new_contract,
      TokenIdentifier::egld(),
      BigUint::zero(),
      BoxedBytes::from(&b"migrateUsers"[..]),
    );

    let arg_buffer = contract_call.get_mut_arg_buffer();

    for user_id in 1..self.users().user_storage().get_user_count() {
      let address = self.users().user_storage().get_user_address(user_id).unwrap();
      let role = self.users().get_role_for_user_id(user_id);

      if role != UserRole::None {
        let args = MultiArg2::<Address, UserRole>::from((address, role));

        let _ = args.push_async_arg(arg_buffer);
      }
    }

    contract_call.execute_on_dest_context(self.blockchain().get_gas_left(), self.send());
  }

  fn send_authorizations(&self, new_contract: Address) {
    let mut contract_call = ContractCall::<BigUint, ()>::new(
      new_contract,
      TokenIdentifier::egld(),
      BigUint::zero(),
      BoxedBytes::from(&b"migrateAuthorizations"[..]),
    );

    let arg_buffer = contract_call.get_mut_arg_buffer();

    for authorization_id in self.authorizations().authorizations().keys() {
      let authorization = self.authorizations().authorizations().get(&authorization_id).unwrap();

      let args = MultiArg5::<BoxedBytes, Address, AuthorizedAmount<BigUint>, AuthorizedDebits, TokenIdentifier>::from((
        authorization_id,
        authorization.authorized_address,
        authorization.authorized_amount,
        authorization.authorized_debits,
        authorization.token,
      ));

      let _ = args.push_async_arg(arg_buffer);
    }

    contract_call.execute_on_dest_context(self.blockchain().get_gas_left(), self.send());
  }

  fn send_every_x_epochs_payments(&self, new_contract: Address) {
    let mut contract_call = ContractCall::<BigUint, ()>::new(
      new_contract.clone(),
      TokenIdentifier::egld(),
      BigUint::zero(),
      BoxedBytes::from(&b"migrateEveryXEpochsPayments"[..]),
    );

    let arg_buffer = contract_call.get_mut_arg_buffer();

    for authorization_id in self.authorizations().authorizations().keys() {
      for (block_epoch, payment_amount) in self.authorizations().every_x_epochs_payments(&authorization_id).iter() {
        let args = MultiArg3::<BoxedBytes, u64, BigUint>::from((
          authorization_id.clone(),
          block_epoch,
          payment_amount,
        ));

        let _ = args.push_async_arg(arg_buffer);
      }
    }

    contract_call.execute_on_dest_context(self.blockchain().get_gas_left(), self.send());
  }

  // migration reciever code

  #[endpoint(startMigration)]
  fn start_migration(&self) -> SCResult<()> {
    let caller = self.blockchain().get_caller();
    require!(&caller == &self.blockchain().get_owner_address(), "Only owner may start migration");

    require!(self.blockchain().is_smart_contract(&caller), "Must be called from previous contract");

    self.migrating().set(&true);

    self.migrated_from().set(&caller);

    let user_id = self.users().user_storage().get_or_create_user(&caller);
    self.users().set_role_for_user_id(user_id, UserRole::None);

    self.migration_started_event(&caller);

    Ok(())
  }

  #[endpoint(migrateUsers)]
  fn migrate_users(&self, #[var_args] user_data: VarArgs<MultiArg2<Address, UserRole>>) -> SCResult<()> {
    let caller = self.blockchain().get_caller();

    require!(self.migrating().get(), "Migration not in progress");

    require!(caller == self.migrated_from().get(), "Must be called from previous contract");

    user_data.into_vec().into_iter().for_each(|var_args| {
      let (address, role) = var_args.into_tuple();

      let user_id = self.users().user_storage().get_or_create_user(&address);
      self.users().set_role_for_user_id(user_id, role);
    } );

    self.users_migrated_event(&caller);

    Ok(())
  }

  #[endpoint(migrateAuthorizations)]
  fn migrate_authorizations(&self, #[var_args] authorization_data: VarArgs<MultiArg5<BoxedBytes, Address, AuthorizedAmount<BigUint>, AuthorizedDebits, TokenIdentifier>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    authorization_data.into_vec().into_iter().for_each(|var_args| {
      let (authorization_id, authorized_address, authorized_amount, authorized_debits, token) = var_args.into_tuple();

      let authorization = PaymentAuthorization::<BigUint> {
        authorized_address: authorized_address,
        authorized_amount: authorized_amount,
        authorized_debits: authorized_debits,
        token: token,
      };

      self.authorizations().authorizations().insert(authorization_id, authorization);
    } );

    Ok(())
  }

  #[endpoint(migrateEveryXEpochsPayments)]
  fn migrate_every_x_epochs_payments(&self, #[var_args] every_x_epochs_payments_data: VarArgs<MultiArg3<BoxedBytes, u64, BigUint>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    every_x_epochs_payments_data.into_vec().into_iter().for_each(|var_args| {
      let (authorization_id, block_epoch, payment_amount) = var_args.into_tuple();

      self.authorizations().every_x_epochs_payments(&authorization_id).push_back((block_epoch, payment_amount));
    } );

    Ok(())
  }

  #[payable("*")]
  #[endpoint(migrateAsset)]
  fn migrate_asset(&self, #[payment_token] token: TokenIdentifier) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    self.assets().known_tokens().insert(token.clone());

    Ok(())
  }

  #[endpoint(endMigration)]
  fn end_migration(&self) -> SCResult<()> {
    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    self.migrating().set(&false);

    Ok(())
  }

  // events

  #[event("migration_started")]
  fn migration_started_event(&self, from: &Address);

  #[event("users_migrated")]
  fn users_migrated_event(&self, from: &Address);

  // storage

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
