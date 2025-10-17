"use client"

import { Card } from "@/components/ui/card"
import { Activity, MessageCircle, Calendar, Award } from "lucide-react"
import useSWR from "swr"

interface MemberStats {
  totalMessages: number
  eventsAttended: number
  daysActive: number
  milestonesCompleted: number
  engagementScore: number
  responseRate: number
}

const fetcher = async (memberId: string): Promise<MemberStats> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    totalMessages: 342,
    eventsAttended: 12,
    daysActive: 45,
    milestonesCompleted: 8,
    engagementScore: 85,
    responseRate: 92,
  }
}

export function MemberStats({ memberId }: { memberId: string }) {
  const { data: stats } = useSWR<MemberStats>(`/api/members/${memberId}/stats`, () => fetcher(memberId))

  if (!stats) return null

  const statCards = [
    {
      label: "Total Messages",
      value: stats.totalMessages,
      icon: MessageCircle,
      color: "text-blue-500",
    },
    {
      label: "Events Attended",
      value: stats.eventsAttended,
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      label: "Days Active",
      value: stats.daysActive,
      icon: Activity,
      color: "text-green-500",
    },
    {
      label: "Milestones",
      value: stats.milestonesCompleted,
      icon: Award,
      color: "text-amber-500",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Member Stats</h2>
      <div className="space-y-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-secondary p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-lg font-bold">{stat.value}</span>
            </div>
          )
        })}

        <div className="mt-6 space-y-3 border-t pt-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Engagement Score</span>
              <span className="font-medium">{stats.engagementScore}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-success" style={{ width: `${stats.engagementScore}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Response Rate</span>
              <span className="font-medium">{stats.responseRate}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-primary" style={{ width: `${stats.responseRate}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
