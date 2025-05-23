import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBua8Y4NDuzWJm7MooKyM7Ls0tBROY6Ujw",
  authDomain: "ana-assistant-app.firebaseapp.com",
  projectId: "ana-assistant-app",
  storageBucket: "ana-assistant-app.firebasestorage.app",
  messagingSenderId: "722760737813",
  appId: "1:722760737813:web:1f1bbc2f763365a9f15a1c",
  measurementId: "G-D083M0CTX9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };