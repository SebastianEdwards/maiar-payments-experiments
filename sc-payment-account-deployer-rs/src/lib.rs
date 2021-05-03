#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::contract(PaymentAccountDeployerImpl)]
pub trait PaymentAccountDeployer {
	#[init]
	fn init(&self, code_template: BoxedBytes) {
		let my_address: Address = self.blockchain().get_caller();
		self.owner().set(&my_address);

		self.code_template().set(&code_template);
	}

	#[endpoint(updateCodeTemplate)]
	fn update_code_template(&self, code_template: BoxedBytes) -> SCResult<()> {
		let caller = self.blockchain().get_caller();

		require!(self.owner().get() == caller, "Only owner can update template");

		self.code_template().set(&code_template);

		Ok(())
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[view(getCodeTemplate)]
	#[storage_mapper("code_template")]
	fn code_template(&self) -> SingleValueMapper<Self::Storage, BoxedBytes>;
}
