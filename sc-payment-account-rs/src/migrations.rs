elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub use crate::authorizations::*;
pub use crate::users::*;

#[elrond_wasm_derive::callable(PaymentAccountProxy)]
pub trait PaymentAccount {
  fn endMigration(&self) -> ContractCall<BigUint, BigUint>;
  fn migrateUsers(&self, #[var_args] user_data: VarArgs<MultiArg2<Address, UserRole>>) -> ContractCall<BigUint, BigUint>;
  fn startMigration(&self) -> ContractCall<BigUint, BigUint>;
}

#[elrond_wasm_derive::module(MigrationsModuleImpl)]
pub trait MigrationsModule {
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

    // Check unsettled funds

		let new_contract = self.send().deploy_contract(
			self.blockchain().get_gas_left(),
			&BigUint::zero(),
			&new_code,
			CodeMetadata::DEFAULT,
			&ArgBuffer::new(),
		);

    Ok(contract_call!(self, new_contract.clone(), PaymentAccountProxy)
      .startMigration()
      .async_call()
			.with_callback(self.callbacks().send_users(new_contract)))
	}

  #[callback]
  fn send_users(&self, new_contract: Address) -> AsyncCall<BigUint> {
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
      let args = MultiArg2::<Address, UserRole>::from((address, role));

      let _ = args.push_async_arg(arg_buffer);
    }

    contract_call.async_call().with_callback(self.callbacks().send_authorizations(new_contract))
  }

  #[callback]
  fn send_authorizations(&self, new_contract: Address) -> AsyncCall<BigUint> {
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

    contract_call.async_call().with_callback(self.callbacks().send_end(new_contract))
  }

  #[callback]
  fn send_every_x_epochs_payments(&self, _new_contract: Address) {
    // TODO: Implement this
  }

  #[callback]
  fn send_assets(&self, _new_contract: Address) {
    // TODO: Implement this
  }

  #[callback]
  fn send_end(&self, new_contract: Address) -> AsyncCall<BigUint> {
    self.migrated().set(&true);
		self.migrated_to().set(&new_contract);

    contract_call!(self, new_contract, PaymentAccountProxy)
      .endMigration()
      .async_call()
  }

  // migration reciever code

  #[endpoint(startMigration)]
  fn start_migration(&self) -> SCResult<()> {
    let caller = self.blockchain().get_caller();
    require!(&caller == &self.blockchain().get_owner_address(), "Only owner may start migration");

    require!(self.blockchain().is_smart_contract(&caller), "Must be called from previous contract");

    self.migrating().set(&true);

    self.migrated_from().set(&caller);

    Ok(())
  }

  #[endpoint(migrateUsers)]
  fn migrate_users(&self, #[var_args] user_data: VarArgs<MultiArg2<Address, UserRole>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    user_data.into_vec().into_iter().for_each(|pair| {
      let (address, role) = pair.into_tuple();

      let _ = self.users().add_user(address, role); // TODO: Interact with storage directly
    } );

    Ok(())
  }

  #[endpoint(migrateAuthorizations)]
  fn migrate_authorizations(&self, #[var_args] authorization_data: VarArgs<MultiArg5<BoxedBytes, Address, AuthorizedAmount<BigUint>, AuthorizedDebits, TokenIdentifier>>) -> SCResult<()> {
    require!(self.migrating().get(), "Migration not in progress");

    require!(self.blockchain().get_caller() == self.migrated_from().get(), "Must be called from previous contract");

    authorization_data.into_vec().into_iter().for_each(|pair| {
      let (authorization_id, authorized_address, authorized_amount, authorized_debits, token) = pair.into_tuple();

      let _ = self.authorizations().authorize(authorization_id, authorized_address, authorized_amount, authorized_debits, token); // TODO: Interact with storage directly
    } );

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
