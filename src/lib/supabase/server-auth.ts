import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

export async function getServerSession() {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return null
    }
    
    return session
  } catch (error) {
    return null
  }
}

export async function requireAuth(redirectTo: string = '/login') {
  const session = await getServerSession()
  
  if (!session) {
    redirect(redirectTo)
  }
  
  return session
}

export async function requireCorrectUser(email: string, redirectTo: string = '/login') {
  const session = await requireAuth(redirectTo)
  
  if (session.user.email !== decodeURIComponent(email)) {
    // If user is accessing someone else's route, redirect to their own
    const encodedEmail = encodeURIComponent(session.user.email!)
    const pathParts = redirectTo.split('/')
    const pageName = pathParts[pathParts.length - 1]
    redirect(`/${encodedEmail}/${pageName}`)
  }
  
  return session
}
