import { supabaseAdmin } from './supabase'
import { Database } from './database.types'

type User = Database['public']['Tables']['users']['Row']
type Membership = Database['public']['Tables']['memberships']['Row']
type WebhookEvent = Database['public']['Tables']['webhook_events']['Row']

export async function upsertUser(userData: {
  whop_user_id: string
  email: string
  username: string
  profile_picture_url?: string
}): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert({
      whop_user_id: userData.whop_user_id,
      email: userData.email,
      username: userData.username,
      profile_picture_url: userData.profile_picture_url,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting user:', error)
    return null
  }

  return data
}

export async function upsertMembership(membershipData: {
  user_id: string
  whop_membership_id: string
  company_id: string
  plan_id: string
  status: 'active' | 'cancelled' | 'expired' | 'pending'
  expires_at?: string
}): Promise<Membership | null> {
  const { data, error } = await supabaseAdmin
    .from('memberships')
    .upsert({
      user_id: membershipData.user_id,
      whop_membership_id: membershipData.whop_membership_id,
      company_id: membershipData.company_id,
      plan_id: membershipData.plan_id,
      status: membershipData.status,
      expires_at: membershipData.expires_at,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting membership:', error)
    return null
  }

  return data
}

export async function getUserByWhopId(whopUserId: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('whop_user_id', whopUserId)
    .single()

  if (error) {
    console.error('Error getting user:', error)
    return null
  }

  return data
}

export async function getUserMemberships(userId: string): Promise<Membership[]> {
  const { data, error } = await supabaseAdmin
    .from('memberships')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error getting memberships:', error)
    return []
  }

  return data || []
}

export async function logWebhookEvent(eventData: {
  event_type: string
  whop_event_id: string
  user_id?: string
  membership_id?: string
  payload: any
}): Promise<WebhookEvent | null> {
  const { data, error } = await supabaseAdmin
    .from('webhook_events')
    .insert({
      event_type: eventData.event_type,
      whop_event_id: eventData.whop_event_id,
      user_id: eventData.user_id,
      membership_id: eventData.membership_id,
      payload: eventData.payload,
    })
    .select()
    .single()

  if (error) {
    console.error('Error logging webhook event:', error)
    return null
  }

  return data
}
