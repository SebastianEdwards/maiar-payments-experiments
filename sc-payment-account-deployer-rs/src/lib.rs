#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::contract(PaymentAccountDeployerImpl)]
pub trait PaymentAccountDeployer {
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

	#[endpoint(createPaymentAccount)]
	fn create_payment_account(&self) -> SCResult<Address> {
		require!(self.code_template_ready().get(), "Code template not ready");

		let caller = self.blockchain().get_caller();

		let mut arg_buffer = ArgBuffer::new();
		arg_buffer.push_argument_bytes(caller.as_bytes());

		Ok(self.send().deploy_contract(
			self.blockchain().get_gas_left(),
			&BigUint::zero(),
			&self.code_template().get(),
			CodeMetadata::UPGRADEABLE,
			&arg_buffer
		))
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[view(getCodeTemplate)]
	#[storage_mapper("code_template")]
	fn code_template(&self) -> SingleValueMapper<Self::Storage, BoxedBytes>;

	#[view(getCodeTemplateReady)]
	#[storage_mapper("code_template_ready")]
	fn code_template_ready(&self) -> SingleValueMapper<Self::Storage, bool>;
}
