#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, TypeAbi, Clone, Copy, PartialEq)]
pub enum AuthorizedAmount<BigUint: BigUintApi> {
	Fixed(BigUint),
	FixedEveryEpochs(BigUint, u32),
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

#[derive(TopEncode, TopDecode, TypeAbi, Clone, Copy, PartialEq)]
pub enum UserRole {
	None,
	Manager,
	SharedAccess,
}

#[elrond_wasm_derive::contract(PaymentAccountImpl)]
pub trait PaymentAccount {
	#[init]
	fn init(&self, initial_address: Address) {
		let my_address: Address = self.blockchain().get_caller();
		self.owner().set(&my_address);

		let user_id = self.users().get_or_create_user(&initial_address);
		self.set_role_for_user_id(user_id, UserRole::Manager);
	}

	#[endpoint]
	fn share(&self, address: Address) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		let caller_id = self.users().get_user_id(&caller);
		require!(self.get_role_for_user_id(caller_id) == UserRole::Manager, "Only manager can share access");

		let user_id = self.users().get_or_create_user(&address);
		self.set_role_for_user_id(user_id, UserRole::SharedAccess);

		Ok(())
	}

  #[payable("*")]
	#[endpoint]
	fn deposit(&self) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can deposit assets");

		Ok(())
	}

	#[endpoint]
	fn withdraw(&self, amount: BigUint, token: TokenIdentifier) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		// if (self.cards().len() > 0) {
		// 	for card in self.cards().values() {
		// 		// TODO: check for withdrawal lock if active card authorization
		// 		// TODO: figure out how to maintain state of previous checks inside multiple async callbacks
		// 	}
		// }

		// TODO: If one or more withdrawal locks: ensure balance of assets minus locked amounts does not exceed withdrawal requests (factor in margin of error for slippage)
		// May require oracle price checks? Do calculation at UI layer first to reduce wastage

		let caller_id = self.users().get_user_id(&caller);
		require!(self.get_role_for_user_id(caller_id) == UserRole::Manager, "Only manager can withdraw assets");

    self.send_tokens(&token, &amount, &caller, &[]);

    Ok(())
	}

	#[endpoint]
	fn authorize(&self, authorization_id: BoxedBytes, authorized_address: Address, authorized_amount: AuthorizedAmount<BigUint>, authorized_debits: AuthorizedDebits, token: TokenIdentifier) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can authorize payments");

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
	fn cancel_authorization(&self, authorization_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		// TODO: allow authorized_address to also cancel authorization

		require!(self.users().get_user_id(&caller) != 0, "Only user can cancel authorization");

		require!(self.authorizations().contains_key(&authorization_id), "Invalid authorization id");

		// TODO: check for withdrawal lock on authorization

		self.authorizations().remove(&authorization_id);

		Ok(())
	}

	#[endpoint(requestPayment)]
	fn request_payment(&self, payment_address: Address, authorization_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.authorizations().contains_key(&authorization_id), "Invalid authorization id");

		let authorization: PaymentAuthorization<BigUint> = self.authorizations().get(&authorization_id).unwrap();

		require!(caller == authorization.authorized_address, "Only authorized_address can request payment");

		match authorization.authorized_amount {
			AuthorizedAmount::Fixed(remaining_amount) => require!(remaining_amount > amount, "Amount requested greater than authorized amount"),
			AuthorizedAmount::FixedEveryEpochs(_amount_every, _epoch_period) => require!(false, "Amount requested great than allowed in current period"), // TODO: handle this
			AuthorizedAmount::Unlimited => require!(true, "Always passes")
		}

		self.send_tokens(&authorization.token, &amount, &payment_address, payment_id.as_slice());

		// TODO: Update and remove authorizations as needed (reached amount limit or debit limit)

		Ok(())
	}

	#[inline]
	fn send_tokens(&self, token: &TokenIdentifier, amount: &BigUint, destination: &Address, data: &[u8]) {
		if amount > &0 {
			let _ = self.send().direct_esdt_via_transf_exec(
				destination,
				token.as_esdt_identifier(),
				amount,
				data,
			);
		}
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[storage_mapper("users")]
	fn users(&self) -> UserMapper<Self::Storage>;

	#[storage_get("user_role")]
	fn get_role_for_user_id(&self, user_id: usize) -> UserRole;

	#[storage_set("user_role")]
	fn set_role_for_user_id(&self, user_id: usize, user_role: UserRole);

	#[storage_mapper("authorizations")]
	fn authorizations(&self) -> MapMapper<Self::Storage, BoxedBytes, PaymentAuthorization<BigUint>>;
}
