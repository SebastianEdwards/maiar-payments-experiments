use elrond_wasm::{
  api::BigUintApi,
  types::{Address, BoxedBytes, TokenIdentifier},
};

elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct CardAuthorization {
  pub address: Address,
  pub id: BoxedBytes,
  pub limit: BigUint,
  pub token_type: TokenIdentifier,
}

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct SubscriptionAuthorization {
  pub address: Address,
  pub amount: BigUint,
  pub epochs: u32,
  pub id: BoxedBytes,
  pub token_type: TokenIdentifier,
}
