"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function DashboardFilters() {
  const [search, setSearch] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [sortBy, setSortBy] = useState("risk-score")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 glass-card vibrant-border-orange smooth-transition">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 glass-card border-0 bg-accent/20 text-foreground placeholder:text-muted-foreground smooth-transition focus:bg-accent/30"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[160px] glass-card border-0 bg-accent/20 text-foreground smooth-transition hover:bg-accent/30">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent className="glass-card vibrant-border">
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="at-risk">At-Risk</SelectItem>
            <SelectItem value="churning">Churning</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] glass-card border-0 bg-accent/20 text-foreground smooth-transition hover:bg-accent/30">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass-card vibrant-border">
            <SelectItem value="risk-score">Risk Score</SelectItem>
            <SelectItem value="last-active">Last Active</SelectItem>
            <SelectItem value="join-date">Join Date</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          className="vibrant-border-green smooth-transition hover:glow-green bg-transparent hover:bg-accent/10 border-2"
        >
          Export
        </Button>
      </div>
    </div>
  )
}
