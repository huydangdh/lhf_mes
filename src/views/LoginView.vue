<script setup lang="ts">
import type { FirebaseAuthResponse } from "@/config/MesUser";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { getFakeMesUserData } from "@/util/fakeResponse.util";
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
      menu: getFakeMesUserData,
      permission:  ["ACCESS_CONFIG_APP"],
    });
  }
  router.push("/");
}
</script>

<template>
  <main class="container">
    <form>
      <div class="mb-3">
        <label for="userName" class="form-label">Email address</label>
        <input
          class="form-control"
          aria-describedby="emailHelp"
          type="text"
          name="userName"
          id="userName"
          v-model="userName"
          required
        />
        <div id="emailHelp" class="form-text">
          <!-- We'll never share your email with anyone else. -->
        </div>
      </div>
      <div class="mb-3">
        <label for="userPassword" class="form-label">Password</label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          v-model="userPassword"
          required
          class="form-control"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Re</label>
      </div>
      <div>
        <button name="btnLogin" class="btn btn-primary" v-on:click="DoLogin">
          {{ userStore.m_isBusy ? "Waitting..." : "Login" }}
        </button>
      </div>
    </form>
  </main>
</template>
