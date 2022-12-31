import { createApp, type App } from "vue";
import { createPinia } from "pinia";

import MainApp from "./App.vue";
import router from "./router";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./config/fireabase.config";

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
