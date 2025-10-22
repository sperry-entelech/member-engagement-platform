import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    WHOP_API_KEY: env.WHOP_API_KEY ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_WHOP_APP_ID: env.NEXT_PUBLIC_WHOP_APP_ID,
    NEXT_PUBLIC_WHOP_AGENT_USER_ID: env.NEXT_PUBLIC_WHOP_AGENT_USER_ID,
    NEXT_PUBLIC_WHOP_COMPANY_ID: env.NEXT_PUBLIC_WHOP_COMPANY_ID,
    NEXTAUTH_URL: env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  });
}
