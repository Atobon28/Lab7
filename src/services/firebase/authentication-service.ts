import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "./firebase-setup";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createUserAccount = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "anaUsers", user.uid), {
      username,
      email,
      createdAt: new Date(),
    });

    localStorage.setItem("currentUserId", user.uid);
    localStorage.setItem("currentUserEmail", email);
    localStorage.setItem("currentUsername", username);

    return { success: true, user };
  } catch (error) {
    console.error("Error al crear cuenta:", error);
    return { success: false, error };
  }
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "anaUsers", user.uid));
    const userData = userDoc.data();

    localStorage.setItem("currentUserId", user.uid);
    localStorage.setItem("currentUserEmail", email);
    if (userData && userData.username) {
      localStorage.setItem("currentUsername", userData.username);
    }

    return { success: true, user, userData };
  } catch (error) {
    console.error("Error al autenticar:", error);
    return { success: false, error };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);

    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUsername");

    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, error };
  }
};

export const verifyAuthStatus = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};