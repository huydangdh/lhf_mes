import type { User } from "firebase/auth";
import type { DefineStoreOptionsInPlugin } from "pinia";

export interface MenuItem {
  id_menu: string,
  title: string,
  desc: string,
  url: string,
  misc: any
}

export interface Menu {
  title: string,
  desc: string,
  id_menu: string,
  root: MenuItem,
  subItem: MenuItem[] | null
}

export declare interface MesUser {
  userId: string | undefined;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  dept: string | undefined;
  permission: string[] | undefined;
  menu: Array<Menu>;
}

export declare interface FirebaseAuthResponse {
  user: User | undefined;
  msg_code: number;
  msg_message: string;
}
