import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Allow access to login and public pages
    if (pathname === '/login' || pathname === '/access-denied') {
      return NextResponse.next()
    }

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // For now, allow access if user is authenticated
    // Membership checking will be handled in the ProtectedPage component
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/members/:path*',
    '/analytics/:path*',
    '/export/:path*',
    '/settings/:path*',
    '/templates/:path*',
    '/workflows/:path*',
    '/onboarding/:path*',
  ],
}
