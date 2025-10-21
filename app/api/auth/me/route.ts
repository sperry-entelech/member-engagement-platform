import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('whop_access_token')?.value
    const userId = cookieStore.get('whop_user_id')?.value
    const email = cookieStore.get('whop_user_email')?.value
    const username = cookieStore.get('whop_user_name')?.value

    if (!accessToken || !userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json({
      id: userId,
      email: email,
      username: username,
      name: username || 'User',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      accessToken: accessToken,
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ error: 'Auth check failed' }, { status: 500 })
  }
}
