"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import "./bottom-nav.css";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  // Extract current tab from pathname (works for both email-based and legacy routes)
  const getCurrentTab = () => {
    if (pathname.includes('/home')) return 'home';
    if (pathname.includes('/calendar')) return 'calendar';
    if (pathname.includes('/lessons')) return 'lessons';
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
      <div 
        className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => handleNavigation('home')}
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </div>
        <span>Home</span>
      </div>
      
      <div 
        className={`nav-item ${currentTab === 'calendar' ? 'active' : ''}`}
        onClick={() => handleNavigation('calendar')}
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <span>Calendar</span>
      </div>
      
      <div 
        className={`nav-item ${currentTab === 'lessons' ? 'active' : ''}`}
        onClick={() => handleNavigation('lessons')}
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span>Lessons</span>
      </div>
      
      <div 
        className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleNavigation('profile')}
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span>Profile</span>
      </div>
    </nav>
  );
}
