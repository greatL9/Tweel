import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tweel-1ccbc.firebaseapp.com",
  projectId: "tweel-1ccbc",
  storageBucket: "tweel-1ccbc.appspot.com",
  messagingSenderId: "710007670096",
  appId: "1:710007670096:web:f3b9f3983e3504f47cd855",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
