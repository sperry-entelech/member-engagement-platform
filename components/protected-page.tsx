import { verifyMembership } from '@/lib/membership'
import { ReactNode } from 'react'

interface ProtectedPageProps {
  children: ReactNode
}

export async function ProtectedPage({ children }: ProtectedPageProps) {
  await verifyMembership()
  
  return <>{children}</>
}
