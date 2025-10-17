import { NextRequest, NextResponse } from 'next/server'
import { whopAPI } from '@/lib/whop-api'
import { logWebhookEvent, upsertUser, upsertMembership, getUserByWhopId } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-whop-signature')

    if (!signature) {
      console.error('Missing webhook signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const isValid = await whopAPI.verifyWebhookSignature(body, signature)
    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    console.log('Received webhook event:', event.type, event.id)

    // Log the webhook event to database
    await logWebhookEvent({
      event_type: event.type,
      whop_event_id: event.id,
      payload: event,
    })

    // Handle different event types
    switch (event.type) {
      case 'membership.created':
        await handleMembershipCreated(event.data)
        break
      case 'membership.updated':
        await handleMembershipUpdated(event.data)
        break
      case 'membership.cancelled':
        await handleMembershipCancelled(event.data)
        break
      case 'membership.renewed':
        await handleMembershipRenewed(event.data)
        break
      case 'user.created':
        await handleUserCreated(event.data)
        break
      case 'user.updated':
        await handleUserUpdated(event.data)
        break
      default:
        console.log('Unhandled webhook event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleMembershipCreated(data: any) {
  console.log('Processing membership created:', data.id)
  
  // First, ensure user exists
  const user = await getUserByWhopId(data.user_id)
  if (!user) {
    console.log('User not found for membership, skipping:', data.user_id)
    return
  }

  // Create/update membership
  await upsertMembership({
    user_id: user.id,
    whop_membership_id: data.id,
    company_id: data.company_id,
    plan_id: data.plan_id,
    status: data.status,
    expires_at: data.expires_at,
  })

  console.log('Membership created/updated:', data.id)
}

async function handleMembershipUpdated(data: any) {
  console.log('Processing membership updated:', data.id)
  
  const user = await getUserByWhopId(data.user_id)
  if (!user) {
    console.log('User not found for membership update, skipping:', data.user_id)
    return
  }

  await upsertMembership({
    user_id: user.id,
    whop_membership_id: data.id,
    company_id: data.company_id,
    plan_id: data.plan_id,
    status: data.status,
    expires_at: data.expires_at,
  })

  console.log('Membership updated:', data.id)
}

async function handleMembershipCancelled(data: any) {
  console.log('Processing membership cancelled:', data.id)
  
  const user = await getUserByWhopId(data.user_id)
  if (!user) {
    console.log('User not found for membership cancellation, skipping:', data.user_id)
    return
  }

  await upsertMembership({
    user_id: user.id,
    whop_membership_id: data.id,
    company_id: data.company_id,
    plan_id: data.plan_id,
    status: 'cancelled',
    expires_at: data.expires_at,
  })

  console.log('Membership cancelled:', data.id)
}

async function handleMembershipRenewed(data: any) {
  console.log('Processing membership renewed:', data.id)
  
  const user = await getUserByWhopId(data.user_id)
  if (!user) {
    console.log('User not found for membership renewal, skipping:', data.user_id)
    return
  }

  await upsertMembership({
    user_id: user.id,
    whop_membership_id: data.id,
    company_id: data.company_id,
    plan_id: data.plan_id,
    status: 'active',
    expires_at: data.expires_at,
  })

  console.log('Membership renewed:', data.id)
}

async function handleUserCreated(data: any) {
  console.log('Processing user created:', data.id)
  
  await upsertUser({
    whop_user_id: data.id,
    email: data.email,
    username: data.username,
    profile_picture_url: data.profile_picture_url,
  })

  console.log('User created:', data.id)
}

async function handleUserUpdated(data: any) {
  console.log('Processing user updated:', data.id)
  
  await upsertUser({
    whop_user_id: data.id,
    email: data.email,
    username: data.username,
    profile_picture_url: data.profile_picture_url,
  })

  console.log('User updated:', data.id)
}
