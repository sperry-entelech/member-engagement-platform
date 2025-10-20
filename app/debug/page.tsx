'use client'

import { useAuth } from '@/hooks/use-auth'

export default function DebugPage() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-4">
        <p><strong>Status:</strong> {isLoading ? 'Loading' : isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
      </div>

      {user ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">User Data:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
          <button 
            onClick={signOut}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button 
            onClick={signIn}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In with Whop
          </button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Environment Check:</h2>
        <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Not set'}</p>
        <p><strong>WHOP_APP_ID:</strong> {process.env.NEXT_PUBLIC_WHOP_APP_ID || 'Not set'}</p>
      </div>
    </div>
  )
}
