import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET(request: Request) {
  console.log('OAuth callback hit');
  
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  console.log('Code:', code);
  console.log('State:', state);

  if (!code) {
    console.log('No code provided, redirecting to login');
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url));
  }

  if (!state) {
    console.log('No state provided, redirecting to login');
    return NextResponse.redirect(new URL("/login?error=missing_state", request.url));
  }

  const cookieStore = await cookies();
  const stateCookie = cookieStore.get(`oauth-state.${state}`);

  console.log('State cookie:', stateCookie);

  if (!stateCookie) {
    console.log('No state cookie found, redirecting to login');
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url));
  }

  try {
    console.log('Exchanging code for access token');
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://whop.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: env.NEXT_PUBLIC_WHOP_APP_ID,
        client_secret: env.WHOP_API_KEY,
        code: code,
        redirect_uri: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/oauth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', await tokenResponse.text());
      return NextResponse.redirect(new URL("/login?error=token_exchange_failed", request.url));
    }

    const tokenData = await tokenResponse.json();
    console.log('Token received:', tokenData);

    // Fetch user info from Whop API
    const userResponse = await fetch('https://api.whop.com/api/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error('User fetch failed:', await userResponse.text());
      return NextResponse.redirect(new URL("/login?error=user_fetch_failed", request.url));
    }

    const userData = await userResponse.json();
    console.log('User data:', userData);

    // Restore the `next` parameter from the state cookie
    const next = decodeURIComponent(stateCookie.value);
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : (process.env.NEXTAUTH_URL || request.url.split('/api')[0]);
    const nextUrl = new URL(next, baseUrl);

    console.log('Redirecting to:', nextUrl.toString());

    // Create response with cookies
    const response = NextResponse.redirect(nextUrl.toString());
    
    // Set cookies for the user session
    response.cookies.set('whop_access_token', tokenData.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
    });

    response.cookies.set('whop_user_id', userData.id, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_email', userData.email || '', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_name', userData.username || userData.email || 'User', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    console.log('OAuth callback completed successfully');
    return response;

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }
}
