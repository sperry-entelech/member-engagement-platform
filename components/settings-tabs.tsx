"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, Zap, Users, Trash2, Webhook } from "lucide-react"
import { WebhookTester } from "@/components/webhook-tester"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="integrations" className="space-y-4">
      <TabsList>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="access">Access Control</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
      </TabsList>

      <TabsContent value="integrations" className="space-y-4">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Connected Integrations</h2>
          <div className="space-y-4">
            <IntegrationCard
              name="Whop"
              description="Member authentication and access control"
              icon={Zap}
              status="connected"
              lastSync="2 hours ago"
            />
            <IntegrationCard
              name="Discord"
              description="Send direct messages and track activity"
              icon={MessageSquare}
              status="connected"
              lastSync="5 minutes ago"
            />
            <IntegrationCard
              name="Email Provider"
              description="Send automated email campaigns"
              icon={Mail}
              status="not-connected"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">API Configuration</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
              <p className="text-xs text-muted-foreground">Receive real-time updates about member activity</p>
            </div>
            <Button variant="outline">Generate API Key</Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="access" className="space-y-4">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Team Members</h2>
          <div className="space-y-4">
            <TeamMemberRow name="Admin User" email="admin@example.com" role="Owner" />
            <TeamMemberRow name="Sarah Chen" email="sarah@example.com" role="Admin" />
            <TeamMemberRow name="Michael Brown" email="michael@example.com" role="Member" />
          </div>
          <Button variant="outline" className="mt-4 w-full bg-transparent">
            <Users className="mr-2 h-4 w-4" />
            Invite Team Member
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Membership Gating</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Require Active Whop Membership</Label>
                <p className="text-sm text-muted-foreground">Only allow access to users with active memberships</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-revoke on Cancellation</Label>
                <p className="text-sm text-muted-foreground">Automatically remove access when membership ends</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Email Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Daily Summary</Label>
                <p className="text-sm text-muted-foreground">Receive daily engagement reports</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>At-Risk Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when members become at-risk</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Workflow Failures</Label>
                <p className="text-sm text-muted-foreground">Alert when automated workflows fail</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Slack Integration</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Connect Slack to receive real-time notifications in your workspace
          </p>
          <Button variant="outline">Connect Slack</Button>
        </Card>
      </TabsContent>

      <TabsContent value="webhooks" className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Webhook className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Webhook Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Whop Webhook URL</Label>
              <Input 
                id="webhook-url" 
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/api/webhooks/whop`}
                readOnly
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Configure this URL in your Whop developer dashboard to receive real-time events
              </p>
            </div>
            <div className="space-y-2">
              <Label>Supported Events</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">membership.created</Badge>
                <Badge variant="outline">membership.updated</Badge>
                <Badge variant="outline">membership.cancelled</Badge>
                <Badge variant="outline">membership.renewed</Badge>
                <Badge variant="outline">user.created</Badge>
                <Badge variant="outline">user.updated</Badge>
              </div>
            </div>
          </div>
        </Card>

        <WebhookTester />
      </TabsContent>
    </Tabs>
  )
}

function IntegrationCard({
  name,
  description,
  icon: Icon,
  status,
  lastSync,
}: {
  name: string
  description: string
  icon: any
  status: "connected" | "not-connected"
  lastSync?: string
}) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{name}</h3>
            <Badge variant={status === "connected" ? "default" : "secondary"}>
              {status === "connected" ? "Connected" : "Not Connected"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {lastSync && <p className="text-xs text-muted-foreground">Last synced {lastSync}</p>}
        </div>
      </div>
      <Button variant="outline" size="sm">
        {status === "connected" ? "Configure" : "Connect"}
      </Button>
    </div>
  )
}

function TeamMemberRow({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">{role}</Badge>
        {role !== "Owner" && (
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
