import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import { whopAPI } from '@/lib/whop-api'

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'whop',
      name: 'Whop',
      type: 'oauth',
      authorization: {
        url: 'https://whop.com/oauth/authorize',
        params: {
          scope: 'read:user',
          response_type: 'code',
        },
      },
      token: 'https://api.whop.com/api/v2/oauth/token',
      userinfo: 'https://api.whop.com/api/v2/me',
      clientId: process.env.WHOP_CLIENT_ID,
      clientSecret: process.env.WHOP_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.profile_picture_url,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.userId = profile.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken && token.userId) {
        session.accessToken = token.accessToken as string
        session.userId = token.userId as string
        session.memberships = []
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true, // Enable debug mode to see what's happening
}

export default NextAuth(authOptions)
