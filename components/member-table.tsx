"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Mail, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useSWR from "swr"

interface Member {
  id: string
  name: string
  email: string
  avatar: string
  riskScore: number
  riskLevel: "active" | "at-risk" | "churning"
  lastActive: string
  joinDate: string
  engagement: number
  discordUsername?: string
}

const fetcher = async (): Promise<Member[]> => {
  // Mock data - replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      riskScore: 85,
      riskLevel: "active",
      lastActive: "2 hours ago",
      joinDate: "2024-01-15",
      engagement: 92,
      discordUsername: "alexj#1234",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      riskScore: 45,
      riskLevel: "at-risk",
      lastActive: "5 days ago",
      joinDate: "2024-02-20",
      engagement: 48,
      discordUsername: "sarahc#5678",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      riskScore: 15,
      riskLevel: "churning",
      lastActive: "14 days ago",
      joinDate: "2023-11-10",
      engagement: 12,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      riskScore: 78,
      riskLevel: "active",
      lastActive: "1 day ago",
      joinDate: "2024-03-05",
      engagement: 85,
      discordUsername: "emilyd#9012",
    },
    {
      id: "5",
      name: "James Wilson",
      email: "james@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      riskScore: 52,
      riskLevel: "at-risk",
      lastActive: "7 days ago",
      joinDate: "2024-01-28",
      engagement: 55,
    },
  ]
}

const getRiskBadgeVariant = (level: Member["riskLevel"]) => {
  switch (level) {
    case "active":
      return "default"
    case "at-risk":
      return "secondary"
    case "churning":
      return "destructive"
  }
}

const getRiskLabel = (level: Member["riskLevel"]) => {
  switch (level) {
    case "active":
      return "Active"
    case "at-risk":
      return "At-Risk"
    case "churning":
      return "Churning"
  }
}

export function MemberTable() {
  const { data: members } = useSWR<Member[]>("/api/members", fetcher)

  if (!members) return null

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Link href={`/members/${member.id}`} className="flex items-center gap-3 hover:underline">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full ${
                        member.riskScore >= 70 ? "bg-success" : member.riskScore >= 40 ? "bg-warning" : "bg-destructive"
                      }`}
                      style={{ width: `${member.riskScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{member.riskScore}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getRiskBadgeVariant(member.riskLevel)}>{getRiskLabel(member.riskLevel)}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{member.lastActive}</TableCell>
              <TableCell>
                <span className="text-sm font-medium">{member.engagement}%</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {member.discordUsername && (
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/members/${member.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Add to Workflow</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
