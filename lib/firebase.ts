// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase設定（.env.local から取得）
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Firebaseアプリの初期化（再初期化エラー防止）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firestore インスタンスをエクスポート
export const db = getFirestore(app);
