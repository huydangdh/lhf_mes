<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue"

const userName = ref("");
const userPassword  = ref("");
const userStore = useUserStore();

function DoLogin(payload: MouseEvent) {
  payload.preventDefault();
  console.log(`User ${userName.value} `)
  userStore.DoLoginByEmailPassword(userName.value, userPassword.value);
}
router.push({
  name: "home"
})
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
            {{ userStore.m_isLoading ? "Waitting..." : "Login" }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
