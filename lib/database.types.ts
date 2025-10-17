export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          whop_user_id: string
          email: string
          username: string
          profile_picture_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          whop_user_id: string
          email: string
          username: string
          profile_picture_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          whop_user_id?: string
          email?: string
          username?: string
          profile_picture_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          user_id: string
          whop_membership_id: string
          company_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired' | 'pending'
          created_at: string
          expires_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          whop_membership_id: string
          company_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired' | 'pending'
          created_at?: string
          expires_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          whop_membership_id?: string
          company_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired' | 'pending'
          created_at?: string
          expires_at?: string | null
          updated_at?: string
        }
      }
      webhook_events: {
        Row: {
          id: string
          event_type: string
          whop_event_id: string
          user_id: string | null
          membership_id: string | null
          payload: any
          processed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          whop_event_id: string
          user_id?: string | null
          membership_id?: string | null
          payload: any
          processed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          whop_event_id?: string
          user_id?: string | null
          membership_id?: string | null
          payload?: any
          processed?: boolean
          created_at?: string
        }
      }
    }
  }
}
