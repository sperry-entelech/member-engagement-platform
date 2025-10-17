// Environment variables - validated at runtime, not build time
export const env = {
  WHOP_CLIENT_ID: process.env.WHOP_CLIENT_ID || '',
  WHOP_CLIENT_SECRET: process.env.WHOP_CLIENT_SECRET || '',
  WHOP_WEBHOOK_SECRET: process.env.WHOP_WEBHOOK_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  WHOP_API_BASE_URL: process.env.WHOP_API_BASE_URL || 'https://api.whop.com/api/v2',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
}
