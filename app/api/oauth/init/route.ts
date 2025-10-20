import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

export function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";

  const { url: authUrl, state } = whopApi.oauth.getAuthorizationUrl({
    // This has to be defined in the redirect uris outlined in step 1.2
    redirectUri: `${process.env.NEXTAUTH_URL}/api/oauth/callback`,
    // These are the authorization scopes you want to request from the user.
    scope: ["read_user"],
  });

  // The state is used to restore the `next` parameter after the user lands on the callback route.
  // Note: This is not a secure way to store the state and for demonstration purposes only.
  return Response.redirect(authUrl, {
    headers: {
      "Set-Cookie": `oauth-state.${state}=${encodeURIComponent(
        next
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });
}
