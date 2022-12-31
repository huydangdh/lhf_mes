<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { useUserStore } from "@/stores/user";
const userStore = useUserStore()

function DoTestSetUser(payload: MouseEvent) {
  userStore.setUser({
    userId:"VN00001",
    userName:"DANG QUANG HUY",
    userEmail:"dqh.dhtb@gmail.com",
    dept:"FB",
    permission:"CONFIG|RUN_APP|REMOVE_MAT"
  })
}

function DoTestClearUser(payload: MouseEvent) {
  userStore.clearUser();
}

function DoTestLogout(){
  userStore.Logout()
}

</script>

<template>
    <div>
        {{userStore.getUser()}}
    </div>
    <div>
      <button v-on:click="DoTestSetUser">DoTestSetUser()</button>
      <button v-on:click="DoTestClearUser">DoTestClearUser()</button>
     <button v-on:click="DoTestLogout">DoLogoutUser()</button>
 </div>
</template>
