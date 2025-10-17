"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Bell, Edit, Copy, Trash2 } from "lucide-react"
import useSWR from "swr"

interface Template {
  id: string
  name: string
  channel: "discord" | "email" | "whop"
  subject?: string
  preview: string
  usageCount: number
  lastUsed?: string
}

const fetcher = async (filter: string): Promise<Template[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const allTemplates: Template[] = [
    {
      id: "1",
      name: "Welcome Message",
      channel: "discord",
      preview: "Hey {{name}}! Welcome to our community. We're excited to have you here...",
      usageCount: 234,
      lastUsed: "2 hours ago",
    },
    {
      id: "2",
      name: "Welcome Email",
      channel: "email",
      subject: "Welcome to {{community_name}}!",
      preview: "Hi {{name}}, Thank you for joining our community. Here's everything you need to get started...",
      usageCount: 189,
      lastUsed: "5 hours ago",
    },
    {
      id: "3",
      name: "At-Risk Check-in",
      channel: "discord",
      preview: "Hi {{name}}, we noticed you haven't been as active lately. Is everything okay?...",
      usageCount: 67,
      lastUsed: "1 day ago",
    },
    {
      id: "4",
      name: "Milestone Celebration",
      channel: "whop",
      preview: "Congratulations {{name}}! You've completed the {{milestone_name}} milestone...",
      usageCount: 145,
      lastUsed: "3 hours ago",
    },
    {
      id: "5",
      name: "Re-engagement Email",
      channel: "email",
      subject: "We miss you, {{name}}!",
      preview: "It's been a while since we've seen you. Here's what you've been missing...",
      usageCount: 92,
      lastUsed: "2 days ago",
    },
  ]

  if (filter === "all") return allTemplates
  return allTemplates.filter((t) => t.channel === filter)
}

const getChannelIcon = (channel: Template["channel"]) => {
  switch (channel) {
    case "discord":
      return MessageSquare
    case "email":
      return Mail
    case "whop":
      return Bell
  }
}

const getChannelColor = (channel: Template["channel"]) => {
  switch (channel) {
    case "discord":
      return "text-blue-500"
    case "email":
      return "text-purple-500"
    case "whop":
      return "text-green-500"
  }
}

export function TemplateList({ filter }: { filter: string }) {
  const { data: templates } = useSWR<Template[]>(`/api/templates?filter=${filter}`, () => fetcher(filter))

  if (!templates) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => {
        const Icon = getChannelIcon(template.channel)
        const color = getChannelColor(template.channel)

        return (
          <Card key={template.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className={`rounded-lg bg-secondary p-2 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    {template.subject && (
                      <p className="text-sm font-medium text-muted-foreground">{template.subject}</p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {template.channel}
                </Badge>
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{template.preview}</p>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{template.usageCount}</span> uses
                  {template.lastUsed && <span> • Last used {template.lastUsed}</span>}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
