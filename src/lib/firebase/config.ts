// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration - these values are safe to be public
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDZR62FYXRc03A9punXrty8wsPwzE0n-Qo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "planora-c0f7a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "planora-c0f7a",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "planora-c0f7a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "393803385575",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:393803385575:web:acdbd1a544948b9b4f7042",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-W80MZ6V22R"
};

// Check if required config values are present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.warn('Missing Firebase configuration:', missingFields.join(', '));
  console.warn('Using fallback configuration values');
} else {
  console.log('Firebase configuration loaded successfully');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log('Firebase initialized with project:', firebaseConfig.projectId);
