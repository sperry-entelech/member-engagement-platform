import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Test webhook received:', {
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries()),
      body,
    })

    return NextResponse.json({ 
      received: true, 
      timestamp: new Date().toISOString(),
      message: 'Test webhook processed successfully' 
    })
  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is ready',
    timestamp: new Date().toISOString(),
    usage: 'Send POST requests to this endpoint to test webhook processing'
  })
}
