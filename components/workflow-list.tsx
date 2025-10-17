"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Workflow, Users, Clock, Edit, Trash2, Play } from "lucide-react"
import useSWR from "swr"

interface WorkflowItem {
  id: string
  name: string
  description: string
  trigger: string
  steps: number
  activeMembers: number
  completionRate: number
  isActive: boolean
  lastRun?: string
}

const fetcher = async (): Promise<WorkflowItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      name: "New Member Welcome Sequence",
      description: "3-day welcome sequence for new members",
      trigger: "Member joins",
      steps: 4,
      activeMembers: 45,
      completionRate: 78,
      isActive: true,
      lastRun: "2 hours ago",
    },
    {
      id: "2",
      name: "At-Risk Member Re-engagement",
      description: "Automated outreach for members showing low engagement",
      trigger: "Risk score < 40",
      steps: 5,
      activeMembers: 23,
      completionRate: 62,
      isActive: true,
      lastRun: "1 day ago",
    },
    {
      id: "3",
      name: "Milestone Celebration",
      description: "Congratulate members on completing milestones",
      trigger: "Milestone completed",
      steps: 2,
      activeMembers: 12,
      completionRate: 95,
      isActive: true,
      lastRun: "5 hours ago",
    },
    {
      id: "4",
      name: "Inactive Member Check-in",
      description: "Weekly check-in for members inactive for 7+ days",
      trigger: "7 days inactive",
      steps: 3,
      activeMembers: 34,
      completionRate: 45,
      isActive: false,
      lastRun: "3 days ago",
    },
  ]
}

export function WorkflowList() {
  const { data: workflows } = useSWR<WorkflowItem[]>("/api/workflows", fetcher)

  if (!workflows) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {workflows.map((workflow) => (
        <Card key={workflow.id} className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Workflow className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{workflow.name}</h3>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>
              </div>
              <Switch checked={workflow.isActive} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline">{workflow.trigger}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{workflow.steps} steps</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{workflow.activeMembers} active</span>
                </div>
                {workflow.lastRun && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Last run {workflow.lastRun}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-medium">{workflow.completionRate}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-success" style={{ width: `${workflow.completionRate}%` }} />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Test Run
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
