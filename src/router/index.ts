import { ROUTER_CONFIG } from "@/config/MesRouter.config";
import { useUserStore } from "@/stores/user";
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTER_CONFIG
});

//router.addRoute({path:"/app/config_mes",component: () => import("../components/app/config_mes.vue"),name:"config_mes"})

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
