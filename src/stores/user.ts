import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MesUser } from "@/config/MesUser";

export const useUserStore = defineStore("mes_user", () => {
  const m_mesUser = ref<MesUser>();

  function setUser(mesUser: MesUser) {
    m_mesUser.value = mesUser;
  }

  function getUser() {
    return m_mesUser;
  }

  function clearUser() {
    m_mesUser.value = undefined;
  }
  return { getUser, setUser, clearUser };
});
