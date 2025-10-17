"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import useSWR from "swr"

interface AnalyticsData {
  engagement: Array<{ date: string; active: number; atRisk: number; churning: number }>
  retention: Array<{ week: string; rate: number }>
  messages: Array<{ date: string; discord: number; email: number; whop: number }>
}

const fetcher = async (): Promise<AnalyticsData> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    engagement: [
      { date: "Week 1", active: 850, atRisk: 200, churning: 100 },
      { date: "Week 2", active: 870, atRisk: 210, churning: 95 },
      { date: "Week 3", active: 880, atRisk: 220, churning: 90 },
      { date: "Week 4", active: 892, atRisk: 234, churning: 121 },
    ],
    retention: [
      { week: "Week 1", rate: 95 },
      { week: "Week 2", rate: 92 },
      { week: "Week 3", rate: 88 },
      { week: "Week 4", rate: 85 },
    ],
    messages: [
      { date: "Mon", discord: 245, email: 120, whop: 45 },
      { date: "Tue", discord: 280, email: 135, whop: 52 },
      { date: "Wed", discord: 310, email: 145, whop: 48 },
      { date: "Thu", discord: 295, email: 128, whop: 55 },
      { date: "Fri", discord: 320, email: 150, whop: 60 },
      { date: "Sat", discord: 180, email: 90, whop: 35 },
      { date: "Sun", discord: 160, email: 85, whop: 30 },
    ],
  }
}

export function AnalyticsCharts() {
  const { data } = useSWR<AnalyticsData>("/api/analytics", fetcher)

  if (!data) return null

  return (
    <Tabs defaultValue="engagement" className="space-y-4">
      <TabsList>
        <TabsTrigger value="engagement">Engagement Trends</TabsTrigger>
        <TabsTrigger value="retention">Retention Rate</TabsTrigger>
        <TabsTrigger value="messages">Message Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="engagement" className="space-y-4">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Member Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data.engagement}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="hsl(var(--success))" strokeWidth={2} name="Active" />
              <Line type="monotone" dataKey="atRisk" stroke="hsl(var(--warning))" strokeWidth={2} name="At-Risk" />
              <Line
                type="monotone"
                dataKey="churning"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Churning"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>

      <TabsContent value="retention" className="space-y-4">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Retention Rate Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data.retention}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Retention Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>

      <TabsContent value="messages" className="space-y-4">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Message Activity by Channel</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.messages}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="discord" fill="hsl(var(--chart-1))" name="Discord" />
              <Bar dataKey="email" fill="hsl(var(--chart-2))" name="Email" />
              <Bar dataKey="whop" fill="hsl(var(--chart-3))" name="Whop" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
