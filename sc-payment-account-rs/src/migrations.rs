elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub use crate::assets::*;
pub use crate::authorizations::*;
pub use crate::users::*;

#[elrond_wasm_derive::callable(PaymentAccountProxy)]
pub trait PaymentAccount {
  fn startMigration(&self) -> ContractCall<BigUint, ()>;
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

  #[view]
  fn ready(&self) -> bool { !self.migrating().get() && !self.migrated().get() }

  // migration initiator code

  #[endpoint]
  fn migrate(&self, new_code: BoxedBytes) -> SCResult<AsyncCall<BigUint>> {
    require!(self.users().current().can_migrate(), "Not allowed to migrate");

    require!(!self.migrating().get(), "Already migrating");

    require!(!self.migrated().get(), "Already migrated");

    // TODO: Check unsettled funds

    self.migrating().set(&true);

    let new_contract = self.send().deploy_contract(
      self.blockchain().get_gas_left(),
      &BigUint::zero(),
      &new_code,
      CodeMetadata::PAYABLE, // TODO: Stop using payable flag after adding payable asset migration endpoint
      &ArgBuffer::new(),
    );

    Ok(contract_call!(self, new_contract.clone(), PaymentAccountProxy)
      .startMigration()
      .async_call()
      .with_callback(self.callbacks().send_users(new_contract)))
  }

  #[callback]
  fn send_users(&self, new_contract: Address, #[call_result] result: AsyncCallResult<()>) -> SCResult<AsyncCall<BigUint>> {
    match result {
      AsyncCallResult::Ok(_) => {
        let mut contract_call = ContractCall::<BigUint, ()>::new(
          new_contract.clone(),
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

        Ok(contract_call.async_call().with_callback(self.callbacks().send_authorizations(new_contract)))
      },
      AsyncCallResult::Err(message) => {
        self.migrating().set(&false);

        Err(message.err_msg.into())
      }
    }
  }

  #[callback]
  fn send_authorizations(&self, new_contract: Address, #[call_result] result: AsyncCallResult<()>) -> SCResult<AsyncCall<BigUint>> {
    match result {
      AsyncCallResult::Ok(_) => {
        let mut contract_call = ContractCall::<BigUint, ()>::new(
          new_contract.clone(),
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

        Ok(contract_call.async_call().with_callback(self.callbacks().send_every_x_epochs_payments(new_contract)))
      },
      AsyncCallResult::Err(message) => {
        self.migrating().set(&false);

        Err(message.err_msg.into())
      }
    }
  }

  #[callback]
  fn send_every_x_epochs_payments(&self, new_contract: Address, #[call_result] result: AsyncCallResult<()>) -> SCResult<AsyncCall<BigUint>> {
    match result {
      AsyncCallResult::Ok(_) => {
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

        Ok(contract_call.async_call().with_callback(self.callbacks().send_assets_and_end_migration(new_contract)))
      },
      AsyncCallResult::Err(message) => {
        self.migrating().set(&false);

        Err(message.err_msg.into())
      }
    }
  }

  #[callback]
  fn send_assets_and_end_migration(&self, new_contract: Address, #[call_result] result: AsyncCallResult<()>) -> SCResult<AsyncCall<BigUint>> {
    match result {
      AsyncCallResult::Ok(_) => {
        for token in self.assets().known_tokens().iter() {
          let balance = self.assets().get_balance(&token);

          // TODO: change this to use migrateAsset endpoint
          self.assets().send_tokens(&token, &balance, &new_contract);
        }

        Ok(contract_call!(self, new_contract.clone(), PaymentAccountProxy)
             .endMigration()
             .async_call()
             .with_callback(self.callbacks().finalize_migration(new_contract)))
      },
      AsyncCallResult::Err(message) => {
        self.migrating().set(&false);

        Err(message.err_msg.into())
      }
    }
  }

  #[callback]
  fn finalize_migration(&self, new_contract: Address, #[call_result] result: AsyncCallResult<()>) -> SCResult<()> {
    match result {
      AsyncCallResult::Ok(_) => {
        self.migrating().set(&false);
        self.migrated().set(&true);
        self.migrated_to().set(&new_contract);

        Ok(())
      },
      AsyncCallResult::Err(message) => {
        self.migrating().set(&false);

        Err(message.err_msg.into())
      }
    }
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

    Ok(())
  }

  #[endpoint(migrateUsers)]
  fn migrate_users(&self, #[var_args] user_data: VarArgs<MultiArg2<Address, UserRole>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    user_data.into_vec().into_iter().for_each(|var_args| {
      let (address, role) = var_args.into_tuple();

      let user_id = self.users().user_storage().get_or_create_user(&address);
      self.users().set_role_for_user_id(user_id, role);
    } );

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

  #[storage_mapper("migrating")]
  fn migrating(&self) -> SingleValueMapper<Self::Storage, bool>;
}
