"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import "./bottom-nav.css";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  // Extract current tab from pathname
  const getCurrentTab = () => {
    if (pathname.includes('/home')) return 'home';
    if (pathname.includes('/friends')) return 'friends';
    if (pathname.includes('/lessons')) return 'lessons';
    if (pathname.includes('/flashcards')) return 'flashcards';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const currentTab = getCurrentTab();

  const handleNavigation = (tab: string) => {
    if (user?.email) {
      const encodedEmail = encodeURIComponent(user.email);
      router.push(`/${encodedEmail}/${tab}`);
    }
  };

  return (
    <nav className="bottom-nav">
      {/* Home */}
      <button 
        className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => handleNavigation('home')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      </button>
      
      {/* Friends */}
      <button 
        className={`nav-item ${currentTab === 'friends' ? 'active' : ''}`}
        onClick={() => handleNavigation('friends')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="m22 21-3-3m2 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/>
        </svg>
      </button>
      
      {/* Lessons */}
      <button 
        className={`nav-item ${currentTab === 'lessons' ? 'active' : ''}`}
        onClick={() => handleNavigation('lessons')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          <path d="M8 7h8"/>
          <path d="M8 11h8"/>
        </svg>
      </button>
      
      {/* Flashcards */}
      <button 
        className={`nav-item ${currentTab === 'flashcards' ? 'active' : ''}`}
        onClick={() => handleNavigation('flashcards')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <path d="M7 12h10"/>
          <path d="M12 7v10"/>
        </svg>
      </button>
      
      {/* Profile */}
      <button 
        className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleNavigation('profile')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
    </nav>
  );
}
