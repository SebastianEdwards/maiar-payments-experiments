use payment_account_deployer::*;
use elrond_wasm_debug::*;

fn main() {
	let contract = PaymentAccountDeployerImpl::new(TxContext::dummy());
	print!("{}", abi_json::contract_abi(&contract));
}
