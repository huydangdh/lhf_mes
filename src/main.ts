import { createApp, type App } from "vue";
import { createPinia } from "pinia";

import MainApp from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./config/fireabase.config";

let app: App<Element>;

onAuthStateChanged(firebaseAuth, (user) => {
  if (!app) {
    app = createApp(MainApp);

    app.use(createPinia());
    app.use(router);

    app.mount("#app");
  }
});
