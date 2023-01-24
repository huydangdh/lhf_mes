import { firebaseAuth } from "@/config/fireabase.config";
import type { FirebaseAuthResponse, MesUser } from "@/config/MesUser";
import { useUserStore } from "@/stores/user";
import { getFakeMesUserData } from "@/util/fakeResponse.util";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from "firebase/auth";

export interface AuthService {
  ProviderName: string;

  DoLogin(username: string, password: string): any;

  DoLogout(): void;

  Init(): Promise<unknown>;
}

/**
 *
 * */
export class FirebaseService implements AuthService {
  ProviderName: string = "Firebase";

  constructor() {}

  async DoLogin(username: string, password: string) {
    let response: FirebaseAuthResponse = {
      user: undefined,
      msg_code: 0,
      msg_message: "NULL",
    };
    try {
      let res = await signInWithEmailAndPassword(
        firebaseAuth,
        username,
        password
      );
      response.user = res.user;
      response.msg_code = 200;
      response.msg_message = "OK./";
    } catch (error : any) {
      response = {
        user: undefined,
        msg_code: 403,
        msg_message: error.message,
      };
    }
    return response;
  }

  async DoLogout() {
    signOut(firebaseAuth);
  }

  Init(): Promise<User | undefined> {
    return new Promise((resolve) => {
      let userStore = useUserStore();
      const subscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          userStore.setUser({
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            dept: "IT",
            permission: ["ACCESS_CONFIG_APP",'ACCESS_TG_KPI_APP'],
            menu: getFakeMesUserData,
          });

          // set menu
          resolve(user);
        } else {
          userStore.setUser(undefined);
          resolve(undefined);
        }

        subscribe();
      });
    });
  }
}
