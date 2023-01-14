<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import { useUserStore } from "@/stores/user";
import { getFakeMesUserData } from "@/util/fakeResponse.util";
import router from "@/router";
import { RouterLink } from "vue-router";
import { MES_APP_ROLE } from "@/config/MesRole.config";

const userStore = useUserStore();

function DoTestSetUser(payload: MouseEvent) {
  userStore.setUser({
    userId: "VN00001",
    userName: "DANG QUANG HUY",
    userEmail: "dqh.dhtb@gmail.com",
    dept: "FB",
    menu: getFakeMesUserData,
    permission: [MES_APP_ROLE.ACCESS_CONFIG_APP, MES_APP_ROLE.CONFIG_APP_ADD],
  });
}

function DoTestClearUser(payload: MouseEvent) {
  userStore.clearUser();
}

function DoTestLogout() {
  userStore.Logout();
  router.push("login");
}

function BeforeLunchApp(input: Object) {
  // ver
  
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
    <div class="row">
      <div class="col col-md-3" v-for="menu in userStore.getUser()?.menu">
        <div class="card mb-3" style="">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ menu.title }}</h5>
            <p class="card-text">
              {{ menu.desc }}
            </p>
            <!-- <button class="btn btn-primary" v-on:click="BeforeLunchApp({
              to: menu.root.url
            })">
              RUN ==>
            </button> -->
            <RouterLink :to="menu.root.url" class="btn btn-primary"
              >LUNCH ==>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
