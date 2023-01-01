import type { User } from "firebase/auth";

export declare interface MesUser {
  userId: string;
  userName: string | null;
  userEmail: string | null;
  dept: string | null;
  permission: string | null;
}

export declare interface FirebaseAuthResponse {
  user: User | undefined;
  msg_code: number;
  msg_message: string;
}
