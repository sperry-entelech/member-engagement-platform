import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporarily disabled for debugging
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Temporarily empty for debugging
  ],
}
