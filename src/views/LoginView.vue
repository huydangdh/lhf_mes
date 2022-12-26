<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userName: string = "adad";
const userPassword: string = "dad";
const userStore = useUserStore();

function DoLogin(payload: MouseEvent) {
  payload.preventDefault();
  userStore.DoLoginByEmailPassword(userName, userPassword);
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
          :value="userName"
          required
        />
        <div>Password:</div>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          :value="userPassword"
          required
        />
        <div>
          <button name="btnLogin" v-on:click="DoLogin">
            {{ userStore.m_isLoading ? "Waitting..." : "Login" }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
