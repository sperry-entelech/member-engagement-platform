import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow access to login, demo, and public pages
  if (pathname === '/login' || pathname === '/access-denied' || pathname === '/demo' || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check if user has auth token
  const accessToken = request.cookies.get('whop_access_token')?.value

  // If no token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

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
    '/demo/:path*',
  ],
}
