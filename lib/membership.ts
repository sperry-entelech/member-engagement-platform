import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { whopAPI } from '@/lib/whop-api'
import { redirect } from 'next/navigation'

export async function verifyMembership() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  try {
    // Get fresh membership data from Whop API
    const memberships = await whopAPI.getUserMemberships(
      session.accessToken,
      session.userId
    )

    // Check if user has any active membership
    const hasActiveMembership = memberships.some(
      membership => membership.status === 'active'
    )

    if (!hasActiveMembership) {
      redirect('/access-denied')
    }

    return {
      user: session.user,
      memberships,
      hasActiveMembership: true
    }
  } catch (error) {
    console.error('Failed to verify membership:', error)
    redirect('/access-denied')
  }
}

export async function getMembershipStatus() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return { isAuthenticated: false, hasMembership: false }
  }

  try {
    const memberships = await whopAPI.getUserMemberships(
      session.accessToken,
      session.userId
    )

    const hasActiveMembership = memberships.some(
      membership => membership.status === 'active'
    )

    return {
      isAuthenticated: true,
      hasMembership: hasActiveMembership,
      memberships
    }
  } catch (error) {
    console.error('Failed to get membership status:', error)
    return { isAuthenticated: true, hasMembership: false }
  }
}
