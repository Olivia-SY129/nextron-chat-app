import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase/app";
import { addUser } from "../lib/firebase/users";

export default function useUserAuth() {
  const signUp = async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredentials.user;

      if (uid) {
        const refId = await addUser(email);
        return !!refId;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredentials.user;

      return !!uid;
    } catch (error) {
      // 보안 상 실패 이유를 알려주지 않음
      return false;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return true;
    } catch (error) {
      return false;
    }
  };

  return { signUp, signIn, signOut };
}
