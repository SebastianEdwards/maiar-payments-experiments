#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct Card<BigUint: BigUintApi> {
  authorized_address: Address,
  limit: BigUint,
  token: TokenIdentifier,
}

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct Subscription<BigUint: BigUintApi> {
  authorized_address: Address,
  max_amount: BigUint,
  period_epochs: u32,
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

		require!(caller == self.owner().get(), "Only manager may share access to payment account");

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

	#[payable("*")]
	#[endpoint]
	fn pay(&self, payment_address: Address, amount: BigUint, token: TokenIdentifier, payment_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can authorize payments");

		// TODO: Exchange tokens as required

		// TODO: Pass payment_id as data
		self.send_tokens(&token, &amount, &payment_address);

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

		let user_id = self.users().get_user_id(&caller);
		require!(self.get_role_for_user_id(user_id) == UserRole::Manager, "Only manager can withdraw assets");

    self.send_tokens(&token, &amount, &caller);

    Ok(())
	}

	#[endpoint]
	fn authorize_subscription(&self, authorized_address: Address, max_amount: BigUint, token: TokenIdentifier, period_epochs: u32, subscription_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can authorize subscriptions");

		let subscription = Subscription::<BigUint> {
			authorized_address: authorized_address,
			max_amount: max_amount,
			period_epochs: period_epochs,
			token: token,
		};

		self.subscriptions().insert(subscription_id, subscription);

		Ok(())
	}

	#[endpoint]
	fn cancel_subscription(&self, subscription_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can cancel subscriptions");

		require!(self.subscriptions().contains_key(&subscription_id), "Invalid subscription id");

		self.subscriptions().remove(&subscription_id);

		Ok(())
	}

	#[endpoint]
	fn request_subscription_payment(&self, payment_address: Address, subscription_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.subscriptions().contains_key(&subscription_id), "Invalid subscription id");

		let subscription: Subscription<BigUint> = self.subscriptions().get(&subscription_id).unwrap();

		require!(caller == subscription.authorized_address, "Only authorized_address can request payment");

		// TODO: Check that max_amount has not been exceeded this subscription period

		self.send_tokens(&subscription.token, &amount, &payment_address);

		Ok(())
	}

	#[endpoint]
	fn authorize_card(&self, authorized_address: Address, limit: BigUint, token: TokenIdentifier, card_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can authorize cards");

		let card = Card::<BigUint> {
			authorized_address: authorized_address,
			limit: limit,
			token: token,
		};

		self.cards().insert(card_id, card);

		Ok(())
	}

	#[endpoint]
	fn cancel_card(&self, card_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.users().get_user_id(&caller) != 0, "Only user can cancel cards");

		require!(self.cards().contains_key(&card_id), "Invalid card id");

		self.cards().remove(&card_id);

		Ok(())
	}

	#[endpoint]
	fn request_card_payment(&self, payment_address: Address, card_id: BoxedBytes, amount: BigUint, payment_id: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.cards().contains_key(&card_id), "Invalid card id");

		let card: Card<BigUint> = self.cards().get(&card_id).unwrap();

		require!(caller == card.authorized_address, "Only authorized_address can request payment");

		require!(amount <= card.limit, "Amount requested greater than card limit");

		self.send_tokens(&card.token, &amount, &payment_address);

		Ok(())
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

	#[storage_mapper("cards")]
	fn cards(&self) -> MapMapper<Self::Storage, BoxedBytes, Card<BigUint>>;

	#[storage_mapper("subscriptions")]
	fn subscriptions(&self) -> MapMapper<Self::Storage, BoxedBytes, Subscription<BigUint>>;
}
