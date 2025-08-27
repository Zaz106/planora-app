// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig() {
  // Debug: Log what's available
  console.log('Environment debug:', {
    NODE_ENV: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    allFirebaseEnvs: typeof process !== "undefined" ? Object.keys(process.env).filter(key => key.includes('FIREBASE')) : []
  });

  // Try Firebase App Hosting's server-side config first
  if (typeof process !== "undefined" && process.env.FIREBASE_CONFIG) {
    try {
      const serverConfig = JSON.parse(process.env.FIREBASE_CONFIG);
      console.log('Using Firebase App Hosting server config');
      
      // For client-side, we need the web app credentials
      // Firebase App Hosting should provide these through FIREBASE_WEBAPP_CONFIG or similar
      let webConfig = serverConfig;
      
      if (process.env.FIREBASE_WEBAPP_CONFIG) {
        try {
          webConfig = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
          console.log('Found FIREBASE_WEBAPP_CONFIG');
        } catch (e) {
          console.warn('Failed to parse FIREBASE_WEBAPP_CONFIG');
        }
      }
      
      return {
        apiKey: webConfig.apiKey || serverConfig.apiKey,
        authDomain: webConfig.authDomain || `${serverConfig.projectId}.firebaseapp.com`,
        projectId: serverConfig.projectId,
        storageBucket: serverConfig.storageBucket,
        messagingSenderId: webConfig.messagingSenderId || serverConfig.messagingSenderId,
        appId: webConfig.appId,
        measurementId: webConfig.measurementId
      };
    } catch (error) {
      console.warn('Failed to parse FIREBASE_CONFIG:', error);
    }
  }
  
  // Check for client-side webapp config
  if (typeof process !== "undefined" && process.env.FIREBASE_WEBAPP_CONFIG) {
    try {
      const config = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
      console.log('Using Firebase App Hosting webapp config');
      return config;
    } catch (error) {
      console.warn('Failed to parse FIREBASE_WEBAPP_CONFIG:', error);
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
