import { WhopServerSdk } from "@whop/api";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    // redirect to error page
    return redirect("/login?error=missing_code");
  }

  if (!state) {
    // redirect to error page
    return redirect("/login?error=missing_state");
  }

  const cookieStore = await cookies();
  const stateCookie = cookieStore.get(`oauth-state.${state}`);

  if (!stateCookie) {
    // redirect to error page
    return redirect("/login?error=invalid_state");
  }

  try {
    // exchange the code for a token
    const authResponse = await whopApi.oauth.exchangeCode({
      code,
      redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/callback`,
    });

    if (!authResponse.ok) {
      return redirect("/login?error=code_exchange_failed");
    }

    const { access_token } = authResponse.tokens;

    // Get user info
    const userResponse = await whopApi.users.me({
      accessToken: access_token,
    });

    if (!userResponse.ok) {
      return redirect("/login?error=user_fetch_failed");
    }

    const user = userResponse.data;

    // Restore the `next` parameter from the state cookie set in the previous step.
    const next = decodeURIComponent(stateCookie.value);
    const nextUrl = new URL(next, process.env.NEXTAUTH_URL);

    // Set the access token and user info in cookies
    const response = redirect(nextUrl.toString());
    
    // Set cookies for the user session
    response.cookies.set('whop_access_token', access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
    });

    response.cookies.set('whop_user_id', user.id, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_email', user.email, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    response.cookies.set('whop_user_name', user.username, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    return response;

  } catch (error) {
    console.error('OAuth callback error:', error);
    return redirect("/login?error=oauth_failed");
  }
}
