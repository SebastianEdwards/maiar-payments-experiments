use payment_account::*;
use elrond_wasm_debug::*;

fn main() {
	let contract = PaymentAccountImpl::new(TxContext::dummy());
	print!("{}", abi_json::contract_abi(&contract));
}
