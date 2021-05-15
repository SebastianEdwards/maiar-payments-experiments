elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, TypeAbi, Clone, Copy, PartialEq)]
pub enum UserRole {
  None,
  Manager,
  SharedAccess,
}

impl UserRole {
  #[inline]
  pub fn can_authorize(&self) -> bool {
    match self {
      UserRole::None => false,
      UserRole::Manager => true,
      UserRole::SharedAccess => true,
    }
  }

  #[inline]
  pub fn can_deposit(&self) -> bool {
    match self {
      UserRole::None => false,
      UserRole::Manager => true,
      UserRole::SharedAccess => true,
    }
  }

  #[inline]
  pub fn can_manage_users(&self) -> bool {
    match self {
      UserRole::None => false,
      UserRole::Manager => true,
      UserRole::SharedAccess => false,
    }
  }

  #[inline]
  pub fn can_migrate(&self) -> bool {
    match self {
      UserRole::None => false,
      UserRole::Manager => true,
      UserRole::SharedAccess => true,
    }
  }

  #[inline]
  pub fn can_withdraw(&self) -> bool {
    match self {
      UserRole::None => false,
      UserRole::Manager => true,
      UserRole::SharedAccess => false,
    }
  }
}

#[elrond_wasm_derive::module]
pub trait UsersModule {
  #[endpoint(addUser)]
  fn add_user(&self, address: Address, role: UserRole) -> SCResult<()> {
    require!(self.current().can_manage_users(), "Not allowed to add user");

    let user_id = self.user_storage().get_or_create_user(&address);
    self.set_role_for_user_id(user_id, role);

    self.user_added_event(&self.blockchain().get_caller(), &role, &address);

    Ok(())
  }

  fn current(&self) -> UserRole {
    let caller = self.blockchain().get_caller();

    self.get_role_for_user_id(self.user_storage().get_user_id(&caller))
  }

  // events

  #[event("user_added")]
  fn user_added_event(&self, #[indexed] manager: &Address, #[indexed] role: &UserRole, new_user: &Address);

  // storage

  #[view]
  #[storage_get("user_role")]
  fn get_role_for_user_id(&self, user_id: usize) -> UserRole;

  #[storage_set("user_role")]
  fn set_role_for_user_id(&self, user_id: usize, user_role: UserRole);

  #[storage_mapper("users")]
  fn user_storage(&self) -> UserMapper<Self::Storage>;
}
