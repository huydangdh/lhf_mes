import { useUserStore } from "@/stores/user";
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiredAuth: true,
      } 
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.addRoute({path:"/app/config_mes",component: () => import("../components/app/config_mes.vue"),name:"config_mes"})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const userStore = useUserStore();
    if (!userStore.getUser() && to.name != "login") {
      next({
        name: "login",
      });
    } else if (userStore.getUser() && to.name == "login") {
      next({ name: "home" });
    } else next();
  }
);

export default router;
