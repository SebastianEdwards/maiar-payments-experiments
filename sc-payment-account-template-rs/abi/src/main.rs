use payment_account_template::*;
use elrond_wasm_debug::*;

fn main() {
	let contract = PaymentAccountTemplateImpl::new(TxContext::dummy());
	print!("{}", abi_json::contract_abi(&contract));
}
