// Waitlist API functions with Firestore integration
import { collection, addDoc, query, where, getDocs, getCountFromServer, Firestore } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface WaitlistEntry {
  email: string;
  timestamp: number;
  createdAt: Date;
}

export const waitlistAPI = {
  // Add email to waitlist
  addToWaitlist: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if Firebase is configured
      if (!db) {
        console.error('Firebase not configured - check .env.local file');
        return {
          success: false,
          message: "Service temporarily unavailable. Please check Firebase configuration."
        };
      }

      // Basic email validation
      if (!email || !email.includes("@")) {
        return {
          success: false,
          message: "Please enter a valid email address"
        };
      }

      console.log('Attempting to add email to waitlist:', email);

      // Check if email already exists
      const q = query(
        collection(db, "WaitlistMembers"),
        where("email", "==", email.toLowerCase())
      );
      
      console.log('Checking for existing email...');
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        console.log('Email already exists');
        return {
          success: false,
          message: "This email is already on the waitlist"
        };
      }

      // Add new email to Firestore
      console.log('Adding new email to Firestore...');
      const docData = {
        email: email.toLowerCase(),
        timestamp: Date.now(),
        createdAt: new Date()
      };
      
      console.log('Document data:', docData);
      await addDoc(collection(db, "WaitlistMembers"), docData);
      
      console.log('Email successfully added to waitlist');
      return {
        success: true,
        message: "Successfully added to waitlist"
      };
    } catch (error: any) {
      console.error('Error adding to waitlist:', error);
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack
      });
      
      // More specific error messages
      if (error?.code === 'permission-denied') {
        return {
          success: false,
          message: "Permission denied. Please check Firebase rules are deployed."
        };
      }
      
      return {
        success: false,
        message: "Something went wrong. Please try again."
      };
    }
  },

  // Get waitlist count
  getWaitlistCount: async (): Promise<number> => {
    try {
      const coll = collection(db, "WaitlistMembers");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    } catch (error: any) {
      console.error('Error getting waitlist count:', error);
      return 0; // Fallback count
    }
  }
};
