"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import BottomNav from "../../components/layout/bottom-nav";
import PageLayout from "../../components/layout/page-layout";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Auth middleware will redirect
  }

  return (
    <>
      <PageLayout
        title={`Welcome back, ${user.email?.split('@')[0]}`}
        subtitle="Ready to continue your learning journey?"
      >
        <div className="space-y-8">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-caption mt-1">Day Streak</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-caption mt-1">Lessons Completed</div>
            </div>
          </div>
          
          {/* Today's Focus */}
          <div className="card p-6">
            <h2 className="text-heading-2 mb-4">Today's Focus</h2>
            <p className="text-body">Continue where you left off or start something new</p>
            <div className="mt-4">
              <button className="btn-primary w-full">Continue Learning</button>
            </div>
          </div>
        </div>
      </PageLayout>
      <BottomNav />
    </>
  );
}
