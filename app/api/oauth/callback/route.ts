import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url));
  }

  if (!state) {
    return NextResponse.redirect(new URL("/login?error=missing_state", request.url));
  }

  const cookieStore = await cookies();
  const stateCookie = cookieStore.get(`oauth-state.${state}`);

  if (!stateCookie) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", request.url));
  }

  try {
    // For now, create a mock user session
    const mockUser = {
      id: 'user_' + Math.random().toString(36).substring(2, 11),
      email: 'user@example.com',
      username: 'testuser',
      name: 'Test User',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };

    // Restore the `next` parameter from the state cookie
    const next = decodeURIComponent(stateCookie.value);
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : (process.env.NEXTAUTH_URL || request.url.split('/api')[0]);
    const nextUrl = new URL(next, baseUrl);

    // Create response with cookies
    const response = NextResponse.redirect(nextUrl.toString());
    
    // Set cookies for the user session
    response.cookies.set('whop_access_token', 'mock_token_' + Math.random().toString(36).substring(2, 11), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
    });

    response.cookies.set('whop_user_id', mockUser.id, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_email', mockUser.email, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_name', mockUser.username, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    return response;

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }
}
