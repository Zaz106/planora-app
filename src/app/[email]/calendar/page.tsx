"use client";
import BottomNav from "../../components/layout/bottom-nav";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import "./calendar.css";

export default function CalendarPage() {
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
        router.push(`/${encodedEmail}/calendar`);
        return;
      }
    }
  }, [user, loading, router, params.email]);

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
        <h1 className="page-title">Calendar</h1>
      </header>

      {/* Content */}
      <div className="page-content">
        <div className="placeholder-content">
          <h2>Calendar Page</h2>
          <p>Coming soon...</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
