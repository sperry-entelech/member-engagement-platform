import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";

  // Generate a random state using modern methods
  const state = Math.random().toString(36).substring(2, 17);

  // Redirect to real Whop OAuth URL
  const whopOAuthUrl = new URL('https://whop.com/oauth/authorize');
  whopOAuthUrl.searchParams.set('client_id', env.NEXT_PUBLIC_WHOP_APP_ID);
  whopOAuthUrl.searchParams.set('redirect_uri', `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/oauth/callback`);
  whopOAuthUrl.searchParams.set('response_type', 'code');
  whopOAuthUrl.searchParams.set('scope', 'read:user');
  whopOAuthUrl.searchParams.set('state', state);

  return NextResponse.redirect(whopOAuthUrl.toString(), {
    headers: {
      "Set-Cookie": `oauth-state.${state}=${encodeURIComponent(
        next
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });
}
