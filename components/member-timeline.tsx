"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Award, AlertCircle, CheckCircle, Calendar } from "lucide-react"
import useSWR from "swr"

interface TimelineEvent {
  id: string
  type: "message" | "email" | "milestone" | "warning" | "event" | "system"
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

const fetcher = async (memberId: string): Promise<TimelineEvent[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      type: "message",
      title: "Sent Discord message",
      description: "Responded to welcome message in #general",
      timestamp: "2024-04-15T10:30:00Z",
    },
    {
      id: "2",
      type: "milestone",
      title: "Completed milestone",
      description: "Finished 'Introduction to Community' milestone",
      timestamp: "2024-04-14T15:20:00Z",
    },
    {
      id: "3",
      type: "event",
      title: "Attended event",
      description: "Joined 'Weekly Q&A Session'",
      timestamp: "2024-04-13T18:00:00Z",
    },
    {
      id: "4",
      type: "email",
      title: "Opened email",
      description: "Opened 'Welcome to the Community' email",
      timestamp: "2024-04-12T09:15:00Z",
    },
    {
      id: "5",
      type: "system",
      title: "Joined community",
      description: "Member account created via Whop",
      timestamp: "2024-04-10T14:00:00Z",
    },
  ]
}

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "message":
      return MessageCircle
    case "email":
      return Mail
    case "milestone":
      return Award
    case "warning":
      return AlertCircle
    case "event":
      return Calendar
    case "system":
      return CheckCircle
  }
}

const getEventColor = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "message":
      return "text-blue-500"
    case "email":
      return "text-purple-500"
    case "milestone":
      return "text-amber-500"
    case "warning":
      return "text-destructive"
    case "event":
      return "text-green-500"
    case "system":
      return "text-muted-foreground"
  }
}

export function MemberTimeline({ memberId }: { memberId: string }) {
  const { data: events } = useSWR<TimelineEvent[]>(`/api/members/${memberId}/timeline`, () => fetcher(memberId))

  if (!events) return null

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">Activity Timeline</h2>
      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.type)
          const color = getEventColor(event.type)

          return (
            <div key={event.id} className="relative flex gap-4">
              {index !== events.length - 1 && <div className="absolute left-5 top-10 h-full w-px bg-border" />}
              <div className={`relative rounded-full bg-secondary p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 pb-4">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{event.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
