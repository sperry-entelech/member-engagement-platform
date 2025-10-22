"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle } from "lucide-react"
import useSWR from "swr"

interface Metrics {
  totalMembers: number
  activeMembers: number
  atRiskMembers: number
  churningMembers: number
  engagementRate: number
  retentionRate: number
}

const fetcher = async (): Promise<Metrics> => {
  // Mock data - replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    totalMembers: 1247,
    activeMembers: 892,
    atRiskMembers: 234,
    churningMembers: 121,
    engagementRate: 71.5,
    retentionRate: 85.2,
  }
}

export function MetricsCards() {
  const { data: metrics } = useSWR<Metrics>("/api/metrics", fetcher)

  if (!metrics) return null

  const cards = [
    {
      title: "Total Members",
      value: metrics.totalMembers.toLocaleString(),
      icon: Users,
      trend: "+12.3%",
      trendUp: true,
    },
    {
      title: "Active Members",
      value: metrics.activeMembers.toLocaleString(),
      icon: CheckCircle,
      trend: "+8.1%",
      trendUp: true,
      color: "text-success",
    },
    {
      title: "At-Risk Members",
      value: metrics.atRiskMembers.toLocaleString(),
      icon: AlertTriangle,
      trend: "-3.2%",
      trendUp: false,
      color: "text-warning",
    },
    {
      title: "Churning Members",
      value: metrics.churningMembers.toLocaleString(),
      icon: TrendingDown,
      trend: "+5.4%",
      trendUp: false,
      color: "text-destructive",
    },
    {
      title: "Engagement Rate",
      value: `${metrics.engagementRate}%`,
      icon: TrendingUp,
      trend: "+2.1%",
      trendUp: true,
    },
    {
      title: "Retention Rate",
      value: `${metrics.retentionRate}%`,
      icon: CheckCircle,
      trend: "+1.8%",
      trendUp: true,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon
        const TrendIcon = card.trendUp ? TrendingUp : TrendingDown
        const borderColors = ['vibrant-border-blue', 'vibrant-border-green', 'vibrant-border-purple', 'vibrant-border-orange', 'vibrant-border-pink', 'vibrant-border-blue']
        const glowColors = ['glow-blue', 'glow-green', 'glow-purple', 'glow-orange', 'glow-pink', 'glow-blue']

        return (
          <Card key={card.title} className={`p-6 glass-card ${borderColors[index]} smooth-transition hover:${glowColors[index]} group`}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className={`text-3xl font-bold ${card.color || "text-foreground"} group-hover:text-white smooth-transition`}>{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${borderColors[index]} smooth-transition group-hover:${glowColors[index]}`}>
                <Icon className={`h-6 w-6 ${card.color || "text-muted-foreground"} group-hover:text-white smooth-transition`} />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <div className={`p-1 rounded-full ${card.trendUp ? "bg-green-500/20" : "bg-red-500/20"}`}>
                <TrendIcon className={`h-3 w-3 ${card.trendUp ? "text-green-400" : "text-red-400"}`} />
              </div>
              <span className={`font-medium ${card.trendUp ? "text-green-400" : "text-red-400"}`}>{card.trend}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
