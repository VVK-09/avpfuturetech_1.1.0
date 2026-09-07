import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const getEnv = (key: string, fallback = "") => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

export const firebaseConfig = {
  apiKey: getEnv("NEXT_PUBLIC_FIREBASE_API_KEY", "AIzaSyDFrqAvfR5xzBgC0mkUdY6jZu9mLHsd81k"),
  authDomain: getEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "avp-futuretech-internship.firebaseapp.com"),
  databaseURL: getEnv("NEXT_PUBLIC_FIREBASE_DATABASE_URL", "https://avp-futuretech-internship-default-rtdb.firebaseio.com"),
  projectId: getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "avp-futuretech-internship"),
  storageBucket: getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "avp-futuretech-internship.firebasestorage.app"),
  messagingSenderId: getEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "323082480943"),
  appId: getEnv("NEXT_PUBLIC_FIREBASE_APP_ID", "1:323082480943:web:c6c07fbc292bd4259985da")
};

let app: any;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  if (!app) {
    try {
      app = initializeApp(firebaseConfig, "avp-futuretech-ts");
      auth = getAuth(app);
      db = getFirestore(app);
    } catch {}
  }
}

export { app, auth, db };
export default app;
