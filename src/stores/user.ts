import { ref } from "vue";
import { defineStore } from "pinia";
import type { FirebaseAuthResponse, MesUser } from "@/config/MesUser";
import { FirebaseService } from "@/services/auth.services";

export const useUserStore = defineStore("mes_user", () => {
  const m_mesUser = ref<MesUser>();
  const m_isBusy = ref(false);
  const m_authSvc = new FirebaseService();

  function setUser(mesUser: MesUser | undefined) {
    m_mesUser.value = mesUser;
  }

  function getUser() {
    return m_mesUser.value;
  }

  function getUserPermission() {
    return m_mesUser.value?.permission;
  }

  function clearUser() {
    m_mesUser.value = undefined;
  }

  function init() {
    return m_authSvc.Init();
  }

  async function DoLoginByEmailPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthResponse> {
    ToggleBusy();
    let _res: FirebaseAuthResponse = await m_authSvc.DoLoginByEmailPassword(
      email,
      password
    );
    ToggleBusy();
    return _res;
  }

  function Logout() {
    m_authSvc.DoLogout();
    m_mesUser.value = undefined;
  }

  function ToggleBusy() {
    m_isBusy.value = !m_isBusy.value;
  }

  return {
    getUser,
    setUser,
    getUserPermission,
    clearUser,
    init,
    DoLoginByEmailPassword,
    ToggleBusy,
    Logout,
    m_isBusy,
  };
});
