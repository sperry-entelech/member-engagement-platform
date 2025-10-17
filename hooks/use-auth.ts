'use client'

import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user,
    accessToken: session?.accessToken,
    userId: session?.userId,
    memberships: session?.memberships || [],
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  }
}
