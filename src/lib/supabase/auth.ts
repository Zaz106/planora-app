import { supabase } from './config'
import type { AuthError } from '@supabase/supabase-js'

export interface AuthResult {
  success: boolean
  error?: string
  needsConfirmation?: boolean
  user?: any
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Check if user needs to confirm email
    const needsConfirmation = !!(data.user && !data.session)
    
    return { 
      success: true, 
      needsConfirmation,
      user: data.user
    }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Sign in with OAuth (Google, GitHub)
export async function signInWithOAuth(provider: 'google' | 'github'): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Sign out
export async function signOut(): Promise<AuthResult> {
  try {
    // Sign out from current session only (not global to avoid issues)
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { success: false, error: error.message }
    }

    // Clear only specific authentication-related data
    if (typeof window !== 'undefined') {
      // Get all localStorage keys that might be Supabase-related
      const allKeys = Object.keys(localStorage);
      const supabaseKeys = allKeys.filter(key => 
        key.startsWith('sb-') || 
        key.includes('supabase') ||
        key.includes('auth-token')
      );
      
      // Remove Supabase auth keys from localStorage
      supabaseKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Also check sessionStorage
      const allSessionKeys = Object.keys(sessionStorage);
      const supabaseSessionKeys = allSessionKeys.filter(key => 
        key.startsWith('sb-') || 
        key.includes('supabase') ||
        key.includes('auth-token')
      );
      
      supabaseSessionKeys.forEach(key => {
        sessionStorage.removeItem(key);
      });
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Get current user
export function getCurrentUser() {
  return supabase.auth.getUser()
}

// Get current session
export function getCurrentSession() {
  return supabase.auth.getSession()
}
