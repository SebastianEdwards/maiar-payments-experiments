use payment_processor::*;
use elrond_wasm_debug::*;

fn main() {
	let contract = PaymentProcessorImpl::new(TxContext::dummy());
	print!("{}", abi_json::contract_abi(&contract));
}
