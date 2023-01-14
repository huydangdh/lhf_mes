import type {
  RouteRecordRaw,
  NavigationGuardWithThis,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConfigMes from "@/views/app/ConfigMes.vue";
import { MES_APP_ROLE } from "./MesRole.config";
import { useUserStore } from "@/stores/user";

function beforeRunApp(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // perform actions here
  let userStore = useUserStore();
  if (!userStore.getUser()) next({ name: "login" });
  // check permission
  else {
    let userPermission = userStore.getUserPermission()
    if(userPermission?.includes(to.meta.permission)){
      next();
    } else {
      alert("NOT PERMISSION !!!")
    }
  }
}

export const ROUTER_CONFIG: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/app/ConfigMes",
    name: "ConfigMes",
    component: ConfigMes,
    beforeEnter: beforeRunApp,
    meta: {
      requiredAuth: true,
      permission: MES_APP_ROLE.ACCESS_CONFIG_APP,
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },
];
