# Member Engagement Platform

A comprehensive member engagement platform integrated with Whop for authentication, membership management, and community analytics.

## Features

- 🔐 **Whop OAuth Integration** - Secure login with Whop accounts
- 🛡️ **Membership Gating** - Server-side verification of active memberships
- 📊 **Analytics Dashboard** - Track member engagement and identify at-risk members
- 🔄 **Real-time Webhooks** - Receive instant updates on membership changes
- 🗄️ **Database Integration** - Supabase for data persistence and real-time updates
- 🎨 **Modern UI** - Built with Next.js, Tailwind CSS, and shadcn/ui components

## Quick Start

### 1. Environment Setup

Create a `.env.local` file with the following variables:

```bash
# Whop API Configuration
WHOP_CLIENT_ID=your_whop_client_id_here
WHOP_CLIENT_SECRET=your_whop_client_secret_here
WHOP_WEBHOOK_SECRET=your_whop_webhook_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Whop API Base URL
WHOP_API_BASE_URL=https://api.whop.com/api/v2
```

### 2. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Get your project URL and API keys from the Supabase dashboard

### 3. Whop Configuration

1. Create a Whop application in your [Whop Developer Dashboard](https://whop.com/developers)
2. Configure OAuth redirect URI: `http://localhost:3000/api/auth/callback/whop`
3. Set up webhook endpoint: `http://localhost:3000/api/webhooks/whop`
4. Copy your client ID, client secret, and webhook secret

### 4. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**: Push your code to a GitHub repository

2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Update Whop Configuration**:
   - Update OAuth redirect URI to: `https://your-app.vercel.app/api/auth/callback/whop`
   - Update webhook endpoint to: `https://your-app.vercel.app/api/webhooks/whop`

4. **Deploy**: Vercel will automatically deploy your application

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `WHOP_CLIENT_ID`
- `WHOP_CLIENT_SECRET` 
- `WHOP_WEBHOOK_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## API Endpoints

- `POST /api/webhooks/whop` - Whop webhook endpoint
- `GET /api/webhooks/test` - Test webhook endpoint
- `GET /api/auth/[...nextauth]` - NextAuth.js authentication

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication pages
│   └── settings/          # Settings pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── whop-api.ts       # Whop API client
│   ├── supabase.ts       # Supabase client
│   └── database.ts       # Database utilities
└── hooks/                # Custom React hooks
```

## Testing

### Test Webhook Integration

1. Go to Settings → Webhooks
2. Use the webhook tester to send test events
3. Check the console logs for event processing

### Test Authentication Flow

1. Visit `/login`
2. Click "Sign in with Whop"
3. Complete OAuth flow
4. Verify access to protected routes

## Support

For issues and questions:
- Check the console logs for error messages
- Verify all environment variables are set correctly
- Ensure Whop webhook configuration matches your deployment URL

## License

MIT License - see LICENSE file for details.
