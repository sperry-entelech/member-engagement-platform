import { ReactNode } from 'react'

interface ProtectedPageProps {
  children: ReactNode
}

export async function ProtectedPage({ children }: ProtectedPageProps) {
  // For now, just render the children without strict membership verification
  // This will be handled client-side for better user experience
  return <>{children}</>
}
