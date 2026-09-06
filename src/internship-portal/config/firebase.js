import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';

// Web app's Firebase configuration for AVP FutureTech Internship Portal
const getEnv = (key, fallback = '') => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY', getEnv('VITE_FIREBASE_API_KEY', "AIzaSyDFrqAvfR5xzBgC0mkUdY6jZu9mLHsd81k")),
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', getEnv('VITE_FIREBASE_AUTH_DOMAIN', "avp-futuretech-internship.firebaseapp.com")),
  databaseURL: getEnv('NEXT_PUBLIC_FIREBASE_DATABASE_URL', getEnv('VITE_FIREBASE_DATABASE_URL', "https://avp-futuretech-internship-default-rtdb.firebaseio.com")),
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', getEnv('VITE_FIREBASE_PROJECT_ID', "avp-futuretech-internship")),
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', getEnv('VITE_FIREBASE_STORAGE_BUCKET', "avp-futuretech-internship.firebasestorage.app")),
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', "323082480943")),
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID', getEnv('VITE_FIREBASE_APP_ID', "1:323082480943:web:c6c07fbc292bd4259985da"))
};

// Initialize Firebase safely
let app;
let auth;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization notice:', error);
  if (!app) {
    app = initializeApp(firebaseConfig, 'avp-futuretech-app');
    auth = getAuth(app);
  }
}

export { 
  app, 
  auth, 
  firebaseConfig,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification 
};
export default app;
