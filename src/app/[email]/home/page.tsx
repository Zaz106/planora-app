"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import BottomNav from "../../components/layout/bottom-nav";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import "./app.css";

export default function HomePage() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalLessons, setTotalLessons] = useState(23);
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
        router.push(`/${encodedEmail}/home`);
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

  const getUserRoute = (path: string) => {
    if (user?.email) {
      const encodedEmail = encodeURIComponent(user.email);
      return `/${encodedEmail}/${path}`;
    }
    return `/${path}`;
  };

  return (
    <main className="app-page">
      {/* Header */}
      <header className="app-header">
        <Logo size={28} />
        <div className="user-menu">
          <Link href={getUserRoute('profile')}>
            <div className="user-avatar">👤</div>
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <span className="stat-number">{currentStreak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <span className="stat-number">{totalLessons}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </section>

      {/* Today's Lesson */}
      <section className="daily-lesson">
        <h1 className="section-title">Today's Lesson</h1>
        <div className="lesson-card">
          <div className="lesson-progress">
            <div className="progress-circle">
              <span>0/3</span>
            </div>
          </div>
          <div className="lesson-content">
            <h2 className="lesson-title">Introduction to React Hooks</h2>
            <p className="lesson-description">
              Learn the basics of useState and useEffect in just 5 minutes
            </p>
            <div className="lesson-meta">
              <span className="lesson-duration">⏱️ 5 min</span>
              <span className="lesson-difficulty">🟢 Beginner</span>
            </div>
          </div>
        </div>
        <button className="start-lesson-btn">
          Start Learning
        </button>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <Link href={getUserRoute('lessons')} className="action-card">
            <div className="action-icon">📖</div>
            <span>Browse Topics</span>
          </Link>
          <div className="action-card">
            <div className="action-icon">🎯</div>
            <span>Set Goals</span>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <span>View Progress</span>
          </div>
          <Link href={getUserRoute('profile')} className="action-card">
            <div className="action-icon">⚙️</div>
            <span>Settings</span>
          </Link>
        </div>
      </section>

      {/* Recent Lessons */}
      <section className="recent-lessons">
        <h2 className="section-title">Continue Learning</h2>
        <div className="lessons-list">
          <div className="lesson-item completed">
            <div className="lesson-status">✓</div>
            <div className="lesson-info">
              <h3>JavaScript Fundamentals</h3>
              <p>Variables and Data Types</p>
            </div>
            <div className="lesson-score">100%</div>
          </div>
          <div className="lesson-item completed">
            <div className="lesson-status">✓</div>
            <div className="lesson-info">
              <h3>CSS Flexbox Basics</h3>
              <p>Layout and Alignment</p>
            </div>
            <div className="lesson-score">95%</div>
          </div>
          <div className="lesson-item">
            <div className="lesson-status">→</div>
            <div className="lesson-info">
              <h3>React Components</h3>
              <p>Props and State Management</p>
            </div>
            <div className="lesson-score">Next</div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
