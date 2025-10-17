// Mock data utilities for development
export const mockMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    riskScore: 85,
    riskLevel: "active" as const,
    lastActive: "2 hours ago",
    joinDate: "2024-01-15",
    engagement: 92,
    discordUsername: "alexj#1234",
  },
  // Add more mock members as needed
]

export const mockMetrics = {
  totalMembers: 1247,
  activeMembers: 892,
  atRiskMembers: 234,
  churningMembers: 121,
  engagementRate: 71.5,
  retentionRate: 85.2,
}
