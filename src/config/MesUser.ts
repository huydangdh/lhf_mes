import type { User } from "firebase/auth";

export declare interface MesUser {
  userId: string | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
  dept: string | undefined;
  permission: string | undefined;
}

export declare interface FirebaseAuthResponse {
  user: User | undefined;
  msg_code: number;
  msg_message: string;
}
