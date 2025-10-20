import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";

  // Generate a random state
  const state = Math.random().toString(36).substr(2, 15);

  // For now, redirect directly to callback with mock parameters
  const callbackUrl = new URL('/api/oauth/callback', request.url);
  callbackUrl.searchParams.set('code', 'mock_code_' + Math.random().toString(36).substr(2, 9));
  callbackUrl.searchParams.set('state', state);

  return NextResponse.redirect(callbackUrl.toString(), {
    headers: {
      "Set-Cookie": `oauth-state.${state}=${encodeURIComponent(
        next
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });
}
