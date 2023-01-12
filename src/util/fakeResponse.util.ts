import type { Menu } from "@/config/MesUser";

export const getFakeMesUserData: Menu[] = [
  {
    id_menu: "001",
    title: "CONFIG",
    desc: "CONFIG FAKE",
    root: {
      id_menu: "r_config_mnu_001",
      desc: "CONFIG MES",
      title: "CONFIG MES",
      url: "/app/config_mes",
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
      url: "/app/tg_kpi",
      misc: null,
    },
    subItem: null,
  },
];
