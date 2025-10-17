'use client'

import { useAuth } from '@/hooks/use-auth'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export function MembershipStatus() {
  const { memberships, isLoading } = useAuth()

  if (isLoading) {
    return <Badge variant="secondary">Loading...</Badge>
  }

  const activeMembership = memberships.find(m => m.status === 'active')
  
  if (activeMembership) {
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <CheckCircle className="mr-1 h-3 w-3" />
        Active Member
      </Badge>
    )
  }

  const pendingMembership = memberships.find(m => m.status === 'pending')
  if (pendingMembership) {
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    )
  }

  return (
    <Badge variant="destructive">
      <XCircle className="mr-1 h-3 w-3" />
      No Active Membership
    </Badge>
  )
}
