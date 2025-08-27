# Planora - Micro-Learning Platform

A Next.js waitlist application for Planora, a micro-learning platform that helps users build consistent learning habits with bite-sized lessons.

## Features

- Responsive waitlist signup page
- Firebase Firestore integration for email collection
- Real-time form validation
- Success/error popup modals
- Automatic redirect from home page to waitlist
- Mobile-first responsive design
- Production-ready deployment configuration

## Tech Stack

- **Framework**: Next.js 15.5.0 with TypeScript
- **Styling**: CSS Modules with custom CSS variables
- **Database**: Firebase Firestore
- **Deployment**: Firebase Hosting, Vercel, or Netlify
- **Package Manager**: npm

## Project Structure

```
src/
├── app/
│   ├── waiting-list/        # Waitlist page and styling
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page (redirects to waitlist)
├── components/
│   ├── layout/             # Navigation component
│   ├── sections/           # Page sections (hero, features, etc.)
│   └── ui/                 # Reusable UI components
└── lib/
    ├── api/                # Waitlist API functions
    └── firebase/           # Firebase configuration
```

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zaz106/planora-app.git
   cd planora-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local` and add your Firebase configuration:
   ```bash
   cp .env.example .env.local
   ```
   
   Get your Firebase config from Firebase Console > Project Settings > General > Your apps

4. **Set up Firestore**
   
   Copy the contents of `firestore.rules` to Firebase Console > Firestore Database > Rules and publish.

5. **Start development server**
   ```bash
   npm run dev
   ```

## Deployment

### Environment Variables Required

All deployment platforms need these environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`
3. Add environment variables in Vercel dashboard

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

### Netlify

1. Connect GitHub repository in Netlify dashboard
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify settings

## Firebase Configuration

### Collection Structure

Waitlist entries are stored in the `WaitlistMembers` collection:

```javascript
{
  email: "user@example.com",
  timestamp: 1642547200000,
  createdAt: Date
}
```

## API Reference

### Waitlist API

**Add to Waitlist**
```javascript
import { waitlistAPI } from '@/lib/api/api';

const result = await waitlistAPI.addToWaitlist('user@example.com');
// Returns: { success: boolean, message: string }
```

**Get Waitlist Count**
```javascript
const count = await waitlistAPI.getWaitlistCount();
// Returns: number
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## Security

- Environment variables are excluded from git via `.gitignore`
- Firebase API keys are client-safe and restricted by domain
- Firestore rules prevent unauthorized access
- No sensitive data is stored in the repository

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

Private project - All rights reserved

## Support

For issues or questions, contact the development team.
