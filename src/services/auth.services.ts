import { firebaseAuth } from "@/config/fireabase.config";
import type { FirebaseAuthResponse, MesUser } from "@/config/MesUser";
import {
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

export interface AuthService {
  ProviderName: string;

  DoLoginByEmailPassword(username: string, password: string): any;

  DoLogout(): void;
}

/**
 *
 * */
export class FirebaseService implements AuthService {
  ProviderName: string = "Firebase";
  constructor() {}

  async DoLoginByEmailPassword(username: string, password: string) {
    let response: FirebaseAuthResponse = {
      user: undefined,
      msg_code: 0,
      msg_message: "NULL"
    };
    try {
      let res = await signInWithEmailAndPassword(
        firebaseAuth,
        username,
        password
      );
      response.user = res.user;
      response.msg_code = 200
      response.msg_message = "OK./"
    } catch (error) {
      response = {
        user : undefined,
        msg_code: 403,
        msg_message: error.message
      };
    }
    return response;
  }

  async DoLogout() {
    signOut(firebaseAuth);
  }
}
