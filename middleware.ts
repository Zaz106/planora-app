import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Check if this is an email-based route
  const emailRouteMatch = pathname.match(/^\/([^\/]+@[^\/]+\.[^\/]+)\/(.+)$/)
  const isEmailBasedRoute = !!emailRouteMatch

  // If user is signed in and trying to access auth pages, redirect to their personalized home
  if (session && (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot'))) {
    const userEmail = session.user.email
    if (userEmail) {
      const encodedEmail = encodeURIComponent(userEmail)
      return NextResponse.redirect(new URL(`/${encodedEmail}/home`, request.url))
    }
  }

  // If user is not signed in and trying to access any protected pages, redirect to login
  if (!session && (
    pathname.startsWith('/app') || 
    pathname === '/home' || 
    pathname === '/calendar' || 
    pathname === '/lessons' || 
    pathname === '/profile' ||
    isEmailBasedRoute
  )) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is signed in and trying to access user-specific routes, verify they match the current user
  if (session && isEmailBasedRoute && emailRouteMatch) {
    const pathEmail = decodeURIComponent(emailRouteMatch[1])
    const userEmail = session.user.email
    const pageName = emailRouteMatch[2]
    
    // If the email in the path doesn't match the current user, redirect to their correct path
    if (pathEmail !== userEmail) {
      const encodedEmail = encodeURIComponent(userEmail!)
      return NextResponse.redirect(new URL(`/${encodedEmail}/${pageName}`, request.url))
    }
  }

  // If user is signed in and accessing old routes (without email), redirect to user-specific routes
  if (session && (pathname === '/home' || pathname === '/calendar' || pathname === '/lessons' || pathname === '/profile')) {
    const userEmail = session.user.email
    if (userEmail) {
      const encodedEmail = encodeURIComponent(userEmail)
      const pageName = pathname.substring(1) // Remove leading slash
      return NextResponse.redirect(new URL(`/${encodedEmail}/${pageName}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ]
}
