"use client";
import { signOut } from "@/lib/supabase/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import BottomNav from "../../components/layout/bottom-nav";

export default function ProfilePage() {
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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error handling is managed by the auth system
    }
  };

  return (
    <div className="page-container">
      <div className="container mx-auto py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-heading-1">Profile</h1>
            <p className="text-body">Manage your account and preferences</p>
          </div>
          
          {/* User Info Card */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-heading-2">{user.email?.split('@')[0]}</h3>
                <p className="text-body">{user.email}</p>
              </div>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="card p-6">
            <h3 className="text-heading-2 mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">7</div>
                <div className="text-caption">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">23</div>
                <div className="text-caption">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">12</div>
                <div className="text-caption">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">156</div>
                <div className="text-caption">Total Minutes</div>
              </div>
            </div>
          </div>
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 hover:transform hover:-translate-y-1 shadow-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
