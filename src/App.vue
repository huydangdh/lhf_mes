<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
userStore.init();
</script>

<template>
  <img
    alt="Vue logo"
    class="logo"
    src="@/assets/logo.svg"
    width="125"
    height="125"
  />

  <div class="wrapper">
    <HelloWorld msg="MES_SYSTEM" />
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="!userStore.getUser()" to="/login">Login</RouterLink>
    </div>
  </div>
  <RouterView />
</template>
