// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig() {
  // Firebase App Hosting automatically injects config at runtime
  if (typeof window !== "undefined" && (window as any).__FIREBASE_DEFAULTS__) {
    console.log('Using Firebase App Hosting injected config');
    return (window as any).__FIREBASE_DEFAULTS__.config;
  }
  
  // For server-side rendering, check for injected server config
  if (typeof process !== "undefined" && process.env.FIREBASE_CONFIG) {
    try {
      const config = JSON.parse(process.env.FIREBASE_CONFIG);
      console.log('Using server-side Firebase config');
      return {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || config.apiKey,
        authDomain: config.authDomain || `${config.projectId}.firebaseapp.com`,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      };
    } catch (error) {
      console.warn('Failed to parse FIREBASE_CONFIG:', error);
    }
  }
  
  // Fallback to environment variables for local development
  console.log('Using local environment variables for Firebase config');
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
  };
}

const firebaseConfig = getFirebaseConfig();

// Check if required config values are present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.warn('Missing Firebase configuration:', missingFields.join(', '));
  console.warn('Make sure Firebase App Hosting is properly configured or check your .env.local file');
}

// Initialize Firebase only if we have the required fields
let app;
let db: any;

if (missingFields.length === 0) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} else {
  // Create mock objects for development
  console.log('Running with mock Firebase config - waitlist will not work');
  db = null;
}

export { db };
