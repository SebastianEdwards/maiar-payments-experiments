elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::proxy]
pub trait PaymentProcessorProxyV0 {
  #[endpoint(getUnsettledAmount)]
  fn get_unsettled_amount(&self, authorization_id: BoxedBytes);
}
