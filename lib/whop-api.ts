import { env } from '@/lib/env'

export interface WhopUser {
  id: string
  email: string
  username: string
  profile_picture_url?: string
  created_at: string
}

export interface WhopMembership {
  id: string
  user_id: string
  company_id: string
  plan_id: string
  status: 'active' | 'cancelled' | 'expired' | 'pending'
  created_at: string
  expires_at?: string
}

export interface WhopCompany {
  id: string
  name: string
  description?: string
  logo_url?: string
}

export class WhopAPI {
  private baseURL: string
  private clientId: string
  private clientSecret: string

  constructor() {
    this.baseURL = env.WHOP_API_BASE_URL || 'https://api.whop.com/api/v2'
    this.clientId = env.WHOP_CLIENT_ID
    this.clientSecret = env.WHOP_CLIENT_SECRET
  }

  async getAccessToken(code: string, redirectUri: string): Promise<string> {
    const response = await fetch(`${this.baseURL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get access token')
    }

    const data = await response.json()
    return data.access_token
  }

  async getUserInfo(accessToken: string): Promise<WhopUser> {
    const response = await fetch(`${this.baseURL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    return response.json()
  }

  async getUserMemberships(accessToken: string, userId: string): Promise<WhopMembership[]> {
    const response = await fetch(`${this.baseURL}/users/${userId}/memberships`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user memberships')
    }

    const data = await response.json()
    return data.data || []
  }

  async getCompanyInfo(accessToken: string, companyId: string): Promise<WhopCompany> {
    const response = await fetch(`${this.baseURL}/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get company info')
    }

    return response.json()
  }

  async verifyWebhookSignature(payload: string, signature: string): Promise<boolean> {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', env.WHOP_WEBHOOK_SECRET)
      .update(payload)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  }
}

export const whopAPI = new WhopAPI()
