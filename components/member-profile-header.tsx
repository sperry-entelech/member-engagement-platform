"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Mail, MoreHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface MemberProfile {
  id: string
  name: string
  email: string
  avatar: string
  riskScore: number
  riskLevel: "active" | "at-risk" | "churning"
  joinDate: string
  lastActive: string
  discordUsername?: string
  whopId: string
}

const fetcher = async (memberId: string): Promise<MemberProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: memberId,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    riskScore: 85,
    riskLevel: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    discordUsername: "alexj#1234",
    whopId: "whop_abc123",
  }
}

const getRiskBadgeVariant = (level: MemberProfile["riskLevel"]) => {
  switch (level) {
    case "active":
      return "default"
    case "at-risk":
      return "secondary"
    case "churning":
      return "destructive"
  }
}

const getRiskLabel = (level: MemberProfile["riskLevel"]) => {
  switch (level) {
    case "active":
      return "Active"
    case "at-risk":
      return "At-Risk"
    case "churning":
      return "Churning"
  }
}

export function MemberProfileHeader({ memberId }: { memberId: string }) {
  const { data: member } = useSWR<MemberProfile>(`/api/members/${memberId}`, () => fetcher(memberId))

  if (!member) return null

  return (
    <div className="space-y-4">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <Card className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback className="text-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{member.name}</h1>
                <Badge variant={getRiskBadgeVariant(member.riskLevel)}>{getRiskLabel(member.riskLevel)}</Badge>
              </div>
              <p className="text-muted-foreground">{member.email}</p>
              {member.discordUsername && (
                <p className="text-sm text-muted-foreground">Discord: {member.discordUsername}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>Last active {member.lastActive}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-sm font-medium">Risk Score:</span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full ${
                  member.riskScore >= 70 ? "bg-success" : member.riskScore >= 40 ? "bg-warning" : "bg-destructive"
                }`}
                style={{ width: `${member.riskScore}%` }}
              />
            </div>
            <span className="text-sm font-bold">{member.riskScore}/100</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
