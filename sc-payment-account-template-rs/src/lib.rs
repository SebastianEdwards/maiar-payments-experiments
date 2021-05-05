#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::contract(PaymentAccountTemplateImpl)]
pub trait PaymentAccountTemplate {
	#[init]
	fn init(&self) {
		let my_address: Address = self.blockchain().get_caller();
		self.owner().set(&my_address);

		self.code_template_ready().set(&false);
		self.code_template().set(&BoxedBytes::empty());
	}

	#[endpoint(startCodeTemplate)]
	fn start_code(&self) -> SCResult<()> {
		self.code_template_ready().set(&false);
		self.code_template().set(&BoxedBytes::empty());

		Ok(())
	}

	#[endpoint(appendCodeTemplate)]
	fn append_code(&self, part: &BoxedBytes) -> SCResult<()> {
		require!(!self.code_template_ready().get(), "Code template already locked");

		let existent = self.code_template().get();
		let new_code = BoxedBytes::from_concat(&[existent.as_slice(), part.as_slice()]);
		self.code_template().set(&new_code);

		Ok(())
	}

	#[endpoint(endCodeTemplate)]
	fn end_construct(&self) -> SCResult<()> {
		self.code_template_ready().set(&true);

		Ok(())
	}

	#[view(getCodeTemplate)]
	fn get_code_template(&self) -> SCResult<BoxedBytes> {
		require!(self.code_template_ready().get(), "Code template not ready");

		Ok(self.code_template().get())
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[storage_mapper("code_template")]
	fn code_template(&self) -> SingleValueMapper<Self::Storage, BoxedBytes>;

	#[view(getCodeTemplateReady)]
	#[storage_mapper("code_template_ready")]
	fn code_template_ready(&self) -> SingleValueMapper<Self::Storage, bool>;
}
