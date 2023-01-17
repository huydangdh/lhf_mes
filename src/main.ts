import { createApp, type App } from "vue";
import { createPinia } from "pinia";

import MainApp from "./App.vue";
import router from "./router";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./config/fireabase.config";

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

import '@vuepic/vue-datepicker/dist/main.css'

let app: App<Element>;

onAuthStateChanged(firebaseAuth, (user) => {
  if (!app) {
    app = createApp(MainApp);
    const pinia = createPinia()
    app.use(pinia);
    app.use(router);
    app.mount("#app");
  }
});
