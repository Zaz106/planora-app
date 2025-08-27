// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig() {
  // Debug: Log available environment variables in production
  console.log('Environment debug:', {
    FIREBASE_WEBAPP_CONFIG: typeof process !== "undefined" ? !!process.env.FIREBASE_WEBAPP_CONFIG : 'N/A',
    FIREBASE_CONFIG: typeof process !== "undefined" ? !!process.env.FIREBASE_CONFIG : 'N/A',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    windowDefaults: typeof window !== "undefined" ? !!(window as any).__FIREBASE_DEFAULTS__ : 'N/A'
  });

  // Check for Firebase App Hosting injected webapp config (client-side)
  if (typeof window !== "undefined" && process.env.FIREBASE_WEBAPP_CONFIG) {
    try {
      const config = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
      console.log('Using Firebase App Hosting webapp config');
      return config;
    } catch (error) {
      console.warn('Failed to parse FIREBASE_WEBAPP_CONFIG:', error);
    }
  }
  
  // Check for server-side Firebase config
  if (typeof process !== "undefined" && process.env.FIREBASE_CONFIG) {
    try {
      const serverConfig = JSON.parse(process.env.FIREBASE_CONFIG);
      console.log('Using Firebase App Hosting server config');
      // Combine server config with any available webapp config
      return {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || serverConfig.apiKey,
        authDomain: serverConfig.authDomain || `${serverConfig.projectId}.firebaseapp.com`,
        projectId: serverConfig.projectId,
        storageBucket: serverConfig.storageBucket,
        messagingSenderId: serverConfig.messagingSenderId || "",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
      };
    } catch (error) {
      console.warn('Failed to parse FIREBASE_CONFIG:', error);
    }
  }
  
  // Check for legacy Firebase defaults injection
  if (typeof window !== "undefined" && (window as any).__FIREBASE_DEFAULTS__) {
    console.log('Using Firebase defaults injection');
    return (window as any).__FIREBASE_DEFAULTS__.config;
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
