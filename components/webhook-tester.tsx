'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Webhook, Send, CheckCircle } from 'lucide-react'

export function WebhookTester() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [payload, setPayload] = useState(`{
  "type": "membership.created",
  "id": "test-event-123",
  "data": {
    "id": "membership-123",
    "user_id": "user-123",
    "company_id": "company-123",
    "plan_id": "plan-123",
    "status": "active",
    "expires_at": "2024-12-31T23:59:59Z"
  }
}`)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTestWebhook = async () => {
    if (!webhookUrl) return

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-whop-signature': 'test-signature',
        },
        body: payload,
      })

      const data = await response.json()
      setResult({
        status: response.status,
        success: response.ok,
        data,
      })
    } catch (error) {
      setResult({
        status: 'error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Webhook className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Webhook Tester</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-app.vercel.app/api/webhooks/whop"
            />
          </div>

          <div>
            <Label htmlFor="payload">Test Payload (JSON)</Label>
            <Textarea
              id="payload"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleTestWebhook} disabled={isLoading || !webhookUrl}>
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? 'Sending...' : 'Test Webhook'}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className={`h-5 w-5 ${result.success ? 'text-green-500' : 'text-red-500'}`} />
            <h3 className="text-lg font-semibold">Test Result</h3>
            <Badge variant={result.success ? 'default' : 'destructive'}>
              {result.status}
            </Badge>
          </div>

          <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  )
}
