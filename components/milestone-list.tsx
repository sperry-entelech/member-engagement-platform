"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Award, Users, Edit, Trash2, GripVertical } from "lucide-react"
import useSWR from "swr"

interface Milestone {
  id: string
  title: string
  description: string
  points: number
  completionRate: number
  totalMembers: number
  completedMembers: number
  isActive: boolean
  order: number
}

const fetcher = async (): Promise<Milestone[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      title: "Welcome to the Community",
      description: "Complete your profile and introduce yourself in #introductions",
      points: 10,
      completionRate: 87,
      totalMembers: 1247,
      completedMembers: 1085,
      isActive: true,
      order: 1,
    },
    {
      id: "2",
      title: "First Conversation",
      description: "Send your first message in any channel",
      points: 15,
      completionRate: 72,
      totalMembers: 1247,
      completedMembers: 898,
      isActive: true,
      order: 2,
    },
    {
      id: "3",
      title: "Attend Your First Event",
      description: "Join a community event or workshop",
      points: 25,
      completionRate: 45,
      totalMembers: 1247,
      completedMembers: 561,
      isActive: true,
      order: 3,
    },
    {
      id: "4",
      title: "Connect with Members",
      description: "Have conversations with at least 3 different members",
      points: 20,
      completionRate: 38,
      totalMembers: 1247,
      completedMembers: 474,
      isActive: true,
      order: 4,
    },
    {
      id: "5",
      title: "Share Your First Win",
      description: "Post about a success or achievement in #wins",
      points: 30,
      completionRate: 28,
      totalMembers: 1247,
      completedMembers: 349,
      isActive: false,
      order: 5,
    },
  ]
}

export function MilestoneList() {
  const { data: milestones } = useSWR<Milestone[]>("/api/milestones", fetcher)

  if (!milestones) return null

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className="p-6">
          <div className="flex items-start gap-4">
            <div className="cursor-grab text-muted-foreground">
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary">{milestone.points} points</Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {milestone.completedMembers} / {milestone.totalMembers} completed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={milestone.isActive} />
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">{milestone.completionRate}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${milestone.completionRate}%` }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
