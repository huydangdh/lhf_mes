<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import { useUserStore } from "@/stores/user";
import { getFakeMesUserData } from "@/util/fakeResponse.util";

const userStore = useUserStore();
const userMenu = userStore.getUser()?.menu;

function DoTestSetUser(payload: MouseEvent) {
  userStore.setUser({
    userId: "VN00001",
    userName: "DANG QUANG HUY",
    userEmail: "dqh.dhtb@gmail.com",
    dept: "FB",
    menu: getFakeMesUserData,
    permission: "CONFIG|RUN_APP|REMOVE_MAT",
  });
}

function DoTestClearUser(payload: MouseEvent) {
  userStore.clearUser();
}

function DoTestLogout() {
  userStore.Logout();
}
</script>

<template>
  <div class="container">
    <div><b>[DEBUG[I]] : </b>{{ userStore.getUser() }}</div>
    <div>
      <div class="card mb-3">
        <div class="card-body">
          <button
            class="btn btn-primary m-1"
            type="button"
            v-on:click="DoTestSetUser"
          >
            DoTestSetUser()
          </button>
          <button
            class="btn btn-primary m-1"
            type="button"
            v-on:click="DoTestClearUser"
          >
            DoTestClearUser()
          </button>
          <button
            class="btn btn-danger m-1"
            type="button"
            v-on:click="DoTestLogout"
          >
            DoLogoutUser()
          </button>
        </div>
      </div>
    </div>
    <div class="card mb-3" v-for="menu in userMenu" style="">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{menu.title}}</h5>
        <p class="card-text">
          {{menu.desc}}
        </p>
        <a :href=menu.root.url class="btn btn-primary">GO ==> </a>
      </div>
    </div>
  </div>
</template>
