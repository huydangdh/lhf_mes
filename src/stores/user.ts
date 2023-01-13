import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { FirebaseAuthResponse, MesUser } from "@/config/MesUser";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/fireabase.config";
import { FirebaseService, type AuthService } from "@/services/auth.services";
import { getFakeMenuRouter, getFakeMesUserData } from "@/util/fakeResponse.util";
import router from "@/router";

export const useUserStore = defineStore("mes_user", () => {
  const m_mesUser = ref<MesUser>();
  const m_isBusy = ref(false);
  const m_authSvc: AuthService = new FirebaseService();

  function setUser(mesUser: MesUser | undefined) {
    m_mesUser.value = mesUser;
  }

  function getUser() {
    return m_mesUser.value;
  }

  function clearUser() {
    m_mesUser.value = undefined;
  }

  function init() {
    return new Promise((resolve) => {
      const subscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser({
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            dept: "IT",
            permission: user.providerId,
            menu: getFakeMesUserData,
          });
          
          // set menu
          resolve(user);
        } else {
          setUser(undefined);
          resolve(null);
        }

        subscribe();
      });
    });
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
    clearUser,
    init,
    DoLoginByEmailPassword,
    ToggleBusy,
    Logout,
    m_isBusy,
  };
});
