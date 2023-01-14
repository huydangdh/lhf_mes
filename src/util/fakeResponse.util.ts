import type { Menu } from "@/config/MesUser";
import type { RouteRecordRaw } from "vue-router";

export function getFakeMenuRouter() : RouteRecordRaw[] {
  let _tmpRouterRecord: Array<RouteRecordRaw> = new Array<RouteRecordRaw>;

  getFakeMesUserData.forEach(element => {
    _tmpRouterRecord.push({
      name: element.root.id_menu,
      path: element.root.url,
      component: () => import(`../components${element.root.url}.vue`)
    })
  });

  return _tmpRouterRecord;
}

export const getFakeMesUserData: Menu[] = [
  {
    id_menu: "001",
    title: "CONFIG",
    desc: "CONFIG FAKE",
    root: {
      id_menu: "r_config_menu_001",
      desc: "CONFIG MES",
      title: "CONFIG MES",
      url: "/app/ConfigMes",
      misc: null,
    },
    subItem: null,
  },
  {
    id_menu: "002",
    desc: "TG_KPI FAKE",
    title: "TG_KPI",
    root: {
      id_menu: "r_tg_kpi_menu_001",
      desc: "TG_KPI",
      title: "TG KPI",
      url: "/app/TgKPI",
      misc: null,
    },
    subItem: null,
  },
];
