"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Clock, MessageSquare, Mail, Bell } from "lucide-react"

export function WorkflowBuilder({ workflowId }: { workflowId: string }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input id="workflow-name" placeholder="e.g., New Member Welcome Sequence" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea id="workflow-description" placeholder="Describe what this workflow does..." />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger</Label>
              <Select defaultValue="member-joins">
                <SelectTrigger id="trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member-joins">Member joins</SelectItem>
                  <SelectItem value="risk-score">Risk score changes</SelectItem>
                  <SelectItem value="milestone">Milestone completed</SelectItem>
                  <SelectItem value="inactive">Days inactive</SelectItem>
                  <SelectItem value="manual">Manual trigger</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Audience</Label>
              <Select defaultValue="all">
                <SelectTrigger id="target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All members</SelectItem>
                  <SelectItem value="active">Active members</SelectItem>
                  <SelectItem value="at-risk">At-risk members</SelectItem>
                  <SelectItem value="churning">Churning members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Workflow Steps</h2>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Step
          </Button>
        </div>

        <WorkflowStep stepNumber={1} type="delay" title="Wait 1 day" description="Delay before sending first message" />
        <WorkflowStep
          stepNumber={2}
          type="discord"
          title="Send Discord DM"
          description="Welcome message with community guidelines"
        />
        <WorkflowStep stepNumber={3} type="delay" title="Wait 3 days" description="Give time to explore" />
        <WorkflowStep
          stepNumber={4}
          type="email"
          title="Send Email"
          description="Check-in email with helpful resources"
        />
      </div>
    </div>
  )
}

function WorkflowStep({
  stepNumber,
  type,
  title,
  description,
}: {
  stepNumber: number
  type: "delay" | "discord" | "email" | "notification"
  title: string
  description: string
}) {
  const getIcon = () => {
    switch (type) {
      case "delay":
        return Clock
      case "discord":
        return MessageSquare
      case "email":
        return Mail
      case "notification":
        return Bell
    }
  }

  const Icon = getIcon()

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {stepNumber}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {type !== "delay" && (
            <div className="space-y-2 pl-11">
              <Label>Message Template</Label>
              <Select defaultValue="template-1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template-1">Welcome Message</SelectItem>
                  <SelectItem value="template-2">Check-in Message</SelectItem>
                  <SelectItem value="template-3">Re-engagement Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
