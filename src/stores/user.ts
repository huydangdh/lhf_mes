import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MesUser } from "@/config/MesUser";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/fireabase.config";
import { FirebaseService, type AuthService } from "@/services/auth.services";

export const useUserStore = defineStore("mes_user", () => {
  const m_mesUser = ref<MesUser>();
  const m_isLoading = ref(false);
  const m_authSvc: AuthService = new FirebaseService();
  function setUser(mesUser: MesUser | undefined) {
    m_mesUser.value = mesUser;
  }

  function getUser() {
    return m_mesUser;
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
            dept: user.refreshToken,
            permission: user.providerId,
          });

          resolve(user);
        } else {
          setUser(undefined);
          resolve(null);
        }

        subscribe()
      });
    });
  }

  function DoLoginByEmailPassword(email: string, password: string) {
    ToggleLoading();
    m_authSvc
      .DoLoginByEmailPassword(email, password)
      .then((user) => {
        ToggleLoading();
        setUser({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          dept: user.refreshToken,
          permission: user.providerId,
        });

      })
      .catch((err) => {
        alert(err);
        ToggleLoading();
      });
  }

  function Logout(){
    m_authSvc.DoLogout()
    m_mesUser.value = undefined
  }

  function ToggleLoading() {
    m_isLoading.value = !m_isLoading.value;
  }

  return {
    getUser,
    setUser,
    clearUser,
    init,
    DoLoginByEmailPassword,
    ToggleLoading,
    Logout,
    m_isLoading,
  };
});
