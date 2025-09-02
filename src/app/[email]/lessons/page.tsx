"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import BottomNav from "../../components/layout/bottom-nav";

export default function LessonsPage() {
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
    <div className="page-container">
      <div className="container mx-auto py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-heading-1">Lessons</h1>
            <p className="text-body">Your learning modules and courses</p>
          </div>
          
          {/* Progress Overview */}
          <div className="card p-6 space-y-4">
            <h2 className="text-heading-2">Your Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-caption">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-caption">In Progress</div>
              </div>
            </div>
          </div>
          
          {/* Coming Soon */}
          <div className="card p-8 text-center space-y-4">
            <div className="text-6xl">📚</div>
            <h2 className="text-heading-2">More Lessons Coming</h2>
            <p className="text-body">Interactive courses and micro-lessons are being prepared</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
