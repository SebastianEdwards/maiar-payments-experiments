elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::proxy]
pub trait PaymentAccountProxyV0 {
  #[endpoint(requestPayment)]
  fn request_payment(&self, authorization_id: BoxedBytes, amount: Self::BigUint);
}
