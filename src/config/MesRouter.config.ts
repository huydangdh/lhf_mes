import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const ROUTER_CONFIG: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: "/app/",
        name: "home",
        component: HomeView,
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: {
      name: "home",
    },
  },
];
