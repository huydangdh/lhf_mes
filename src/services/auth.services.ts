import { firebaseAuth } from "@/config/fireabase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseService {
  constructor() {}

  async DoLoginByEmailPassword(username: string, password: string) {
      let user = await signInWithEmailAndPassword(firebaseAuth,username, password)
      console.log(user);
  }

  async DoLogout() {}
}
