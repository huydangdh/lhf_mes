import { firebaseAuth } from "@/config/fireabase.config";
import type { MesUser } from "@/config/MesUser";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export interface AuthService {
  ProviderName: string

  DoLoginByEmailPassword(username: string, password: string): Promise<any>

  DoLogout(): void
}

export class FirebaseService implements AuthService {
  ProviderName: string = "Firebase";
  constructor() {
  }

  async DoLoginByEmailPassword(username: string, password: string) {
    var user = await signInWithEmailAndPassword(firebaseAuth, username, password)
    return user.user
  }

  async DoLogout() {
    signOut(firebaseAuth)
  }
}
