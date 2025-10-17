"use client"

import { Card } from "@/components/ui/card"
import useSWR from "swr"

interface FunnelStage {
  name: string
  count: number
  percentage: number
}

const fetcher = async (): Promise<FunnelStage[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    { name: "Total Members", count: 1247, percentage: 100 },
    { name: "Completed Profile", count: 1085, percentage: 87 },
    { name: "First Message Sent", count: 898, percentage: 72 },
    { name: "Attended Event", count: 561, percentage: 45 },
    { name: "Active Contributors", count: 349, percentage: 28 },
  ]
}

export function EngagementFunnel() {
  const { data: stages } = useSWR<FunnelStage[]>("/api/analytics/funnel", fetcher)

  if (!stages) return null

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold">Engagement Funnel</h2>
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const width = stage.percentage
          const isFirst = index === 0
          const dropoff = index > 0 ? stages[index - 1].percentage - stage.percentage : 0

          return (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stage.name}</span>
                <div className="flex items-center gap-4">
                  {!isFirst && dropoff > 0 && (
                    <span className="text-xs text-destructive">-{dropoff.toFixed(0)}% drop-off</span>
                  )}
                  <span className="text-muted-foreground">
                    {stage.count.toLocaleString()} ({stage.percentage}%)
                  </span>
                </div>
              </div>
              <div className="h-12 overflow-hidden rounded-lg bg-secondary">
                <div
                  className="flex h-full items-center justify-center bg-gradient-to-r from-primary to-primary/80 text-sm font-medium text-primary-foreground transition-all"
                  style={{ width: `${width}%` }}
                >
                  {width > 20 && `${stage.percentage}%`}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
