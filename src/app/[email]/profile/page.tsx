"use client";
import { signOut } from "@/lib/supabase/auth";
import BottomNav from "../../components/layout/bottom-nav";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import "./profile.css";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If no user, redirect to login
        router.push('/login');
        return;
      }
      
      // Check if the user is accessing their own page
      const pathEmail = decodeURIComponent(params.email as string);
      if (user.email !== pathEmail) {
        // Redirect to their own page
        const encodedEmail = encodeURIComponent(user.email!);
        router.push(`/${encodedEmail}/profile`);
        return;
      }
    }
  }, [user, loading, router, params.email]);
  
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        // Use Next.js router for clean navigation
        router.push('/login');
        // Add a small delay then refresh to ensure clean state
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      // Silent error handling
    }
  };

  // Show loading state while checking auth
  if (loading || !user) {
    return (
      <main className="app-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      {/* Header */}
      <header className="app-header">
        <h1 className="page-title">Profile</h1>
      </header>

      {/* Content */}
      <div className="page-content">
        <div className="profile-section">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <h2>{user?.user_metadata?.full_name || 'User'}</h2>
            <p>{user?.email || 'No email available'}</p>
          </div>

          <div className="settings-section">
            <h3>Settings</h3>
            <div className="settings-list">
              <div className="settings-item">
                <span>Notifications</span>
                <div className="toggle">Coming soon</div>
              </div>
              <div className="settings-item">
                <span>Privacy</span>
                <div className="toggle">Coming soon</div>
              </div>
              <div className="settings-item">
                <span>About</span>
                <div className="toggle">Coming soon</div>
              </div>
            </div>
          </div>

          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
