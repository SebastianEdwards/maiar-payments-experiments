#![no_std]
#![allow(non_snake_case)]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[elrond_wasm_derive::callable(PaymentAccountTemplateProxy)]
pub trait PaymentAccountTemplate {
	fn getCodeTemplate(&self) -> ContractCall<BigUint, BoxedBytes>;
}

#[elrond_wasm_derive::contract(PaymentAccountDeployerImpl)]
pub trait PaymentAccountDeployer {
	#[init]
	fn init(&self, code_template_address: Address) {
		self.owner().set(&self.blockchain().get_caller());
		self.code_template_address().set(&code_template_address);
	}

	#[endpoint(createPaymentAccount)]
	fn create_payment_account(&self) -> AsyncCall<BigUint> {
		contract_call!(self, self.code_template_address().get(), PaymentAccountTemplateProxy)
			.getCodeTemplate()
			.async_call()
			.with_callback(self.callbacks().deploy_payment_account(self.blockchain().get_caller()))
	}

	#[callback]
	fn deploy_payment_account(&self, user_address: Address, #[call_result] result: AsyncCallResult<BoxedBytes>) -> SCResult<Address> {
		let mut arg_buffer = ArgBuffer::new();
		arg_buffer.push_argument_bytes(user_address.as_bytes());

		match result {
			AsyncCallResult::Ok(code_template) => Ok(self.send().deploy_contract(
				self.blockchain().get_gas_left(),
				&BigUint::zero(),
				&code_template,
				CodeMetadata::UPGRADEABLE,
				&arg_buffer,
			)),
			// TODO: Investigate - something strange is happening where even successful cross-shard calls are returning as AsyncCallResult::Err
			// AsyncCallResult::Err(message) => Err(message.err_msg.into()),
			AsyncCallResult::Err(message) => Ok(self.send().deploy_contract(
				self.blockchain().get_gas_left(),
				&BigUint::zero(),
				&message.err_msg.into(),
				CodeMetadata::UPGRADEABLE,
				&arg_buffer,
			))
		}
	}

	// storage

	#[view(getOwner)]
	#[storage_mapper("owner")]
	fn owner(&self) -> SingleValueMapper<Self::Storage, Address>;

	#[view(getCodeAddress)]
	#[storage_mapper("code_template_address")]
	fn code_template_address(&self) -> SingleValueMapper<Self::Storage, Address>;
}
