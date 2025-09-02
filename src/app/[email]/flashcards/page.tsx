"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import BottomNav from "../../components/layout/bottom-nav";

export default function FlashcardsPage() {
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
            <h1 className="text-heading-1">Flashcards</h1>
            <p className="text-body">Practice with interactive flashcards</p>
          </div>
          
          {/* Coming Soon Card */}
          <div className="card p-8 text-center space-y-4">
            <div className="text-6xl">🃏</div>
            <h2 className="text-heading-2">Coming Soon</h2>
            <p className="text-body">Create and practice with custom flashcards</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
