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

    // Optionally fetch fresh user data from Whop API
    try {
      const userResponse = await fetch('https://api.whop.com/api/v2/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        return NextResponse.json({
          id: userData.id,
          email: userData.email || email,
          username: userData.username || username,
          name: userData.username || userData.email || username || 'User',
          image: userData.profile_picture_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          accessToken: accessToken,
        });
      }
    } catch (apiError) {
      console.log('Failed to fetch fresh user data, using cached data:', apiError);
    }

    // Fallback to cached data
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
