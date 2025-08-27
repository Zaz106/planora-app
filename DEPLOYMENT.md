# Planora Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Setup
- ✅ Firebase project created
- ✅ Firestore database enabled
- ✅ Environment variables configured
- ✅ Security files added to .gitignore

### 2. Required Configuration

#### Firebase Environment Variables
Copy your Firebase config from Firebase Console > Project Settings > General > Your apps:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

#### Firestore Security Rules
Copy the contents of `firestore.rules` to Firebase Console > Firestore Database > Rules and publish.

### 3. Deployment Options

#### Option A: Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

#### Option B: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Option C: Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### 4. Post-Deployment
- [ ] Test waitlist functionality
- [ ] Verify Firebase connection
- [ ] Check responsive design on mobile
- [ ] Monitor Firebase usage and costs

## 🔧 Local Development
```bash
npm install
npm run dev
```

## 📊 Features Included
- ✅ Responsive waitlist page
- ✅ Firebase Firestore integration
- ✅ Email collection with validation
- ✅ Success/error popup modals
- ✅ Navigation links to waitlist
- ✅ Secure environment variables
- ✅ Production-ready build configuration
