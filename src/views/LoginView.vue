<script setup lang="ts">
import type { FirebaseAuthResponse } from "@/config/MesUser";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const userName = ref("");
const userPassword = ref("");
const userStore = useUserStore();

async function DoLogin(payload: MouseEvent) {
  payload.preventDefault();
  console.log(`User ${userName.value} `);

  var _res: FirebaseAuthResponse = await userStore.DoLoginByEmailPassword(
    userName.value,
    userPassword.value
  );
  if (_res.msg_code !== 200) alert(_res.msg_message);
  else {
    userStore.setUser({
      userId: _res.user?.uid,
      userEmail: _res.user?.email,
      userName: _res.user?.displayName,
      dept: "IT",
      permission: "ALL"
    })
  }
  router.push("/")
}
</script>

<template>
  <main>
    <div>
      <p>LOGIN</p>
    </div>
    <div>
      <form method="post">
        <div>User name:</div>
        <input
          type="text"
          name="userName"
          id="userName"
          v-model="userName"
          required
        />
        <div>Password:</div>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          v-model="userPassword"
          required
        />
        <div>
          <button name="btnLogin" v-on:click="DoLogin">
            {{ userStore.m_isBusy ? "Waitting..." : "Login" }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
