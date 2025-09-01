'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/config'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const hasRedirectedRef = useRef(false)
  const authListenerRef = useRef<any>(null)

  useEffect(() => {
    // Prevent duplicate listeners
    if (authListenerRef.current) {
      return
    }

    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

        // Listen for auth changes with redirect logic
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return
            
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)

            // Handle sign in redirect
            if (event === 'SIGNED_IN' && session?.user?.email) {
              const encodedEmail = encodeURIComponent(session.user.email)
              const expectedPath = `/${encodedEmail}/home`
              
              // Only redirect if on auth pages and haven't redirected yet
              const isOnAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot')
              const isOnUserPage = pathname.includes(`/${encodedEmail}/`)
              
              if (!hasRedirectedRef.current && isOnAuthPage && !isOnUserPage) {
                hasRedirectedRef.current = true
                router.push(expectedPath)
                
                // Reset redirect flag after navigation
                setTimeout(() => {
                  hasRedirectedRef.current = false
                }, 2000)
              }
            }
            
            // Handle sign out
            if (event === 'SIGNED_OUT') {
              hasRedirectedRef.current = false
              router.push('/login')
            }
          }
        )

        authListenerRef.current = subscription

    return () => {
      mounted = false
      if (authListenerRef.current) {
        authListenerRef.current.unsubscribe()
        authListenerRef.current = null
      }
    }
  }, [router, pathname])

  return {
    user,
    session,
    loading,
  }
}
