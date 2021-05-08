#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

pub mod assets;
pub mod authorizations;
pub mod migrations;
pub mod users;

pub use crate::assets::*;
pub use crate::authorizations::*;
pub use crate::migrations::*;
pub use crate::users::*;

#[elrond_wasm_derive::contract(PaymentAccountImpl)]
pub trait PaymentAccount {
	#[module(AssetsModuleImpl)]
	fn assets(&self) -> AssetsModuleImpl<T, BigInt, BigUint>;

	#[module(AuthorizationsModuleImpl)]
	fn authorizations(&self) -> AuthorizationsModuleImpl<T, BigInt, BigUint>;

	#[module(MigrationsModuleImpl)]
	fn migrations(&self) -> MigrationsModuleImpl<T, BigInt, BigUint>;

	#[module(UsersModuleImpl)]
	fn users(&self) -> UsersModuleImpl<T, BigInt, BigUint>;

	#[init]
	fn init(&self) {
		let user_id = self.users().user_storage().get_or_create_user(&self.blockchain().get_caller());
		self.users().set_role_for_user_id(user_id, UserRole::Manager);
	}
}
