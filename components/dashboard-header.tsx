"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Settings, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Onboarding", href: "/onboarding" },
  { name: "Workflows", href: "/workflows" },
  { name: "Templates", href: "/templates" },
  { name: "Analytics", href: "/analytics" },
  { name: "Export", href: "/export" },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl simple-card simple-shadow smooth-transition">
            <span className="text-lg font-bold text-foreground">CC</span>
          </div>
          <span className="hidden font-semibold sm:inline-block text-foreground">Community Core</span>
        </Link>

        <nav className="flex flex-1 items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium smooth-transition relative group ${
                  isActive 
                    ? "simple-border bg-accent/20 text-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="smooth-transition hover:bg-accent/20">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-xl simple-card smooth-transition">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.image || "/placeholder.svg?height=40&width=40"} alt={user?.username || "User"} />
                  <AvatarFallback className="bg-accent text-foreground">{user?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="simple-card">
              <DropdownMenuItem asChild>
                <Link href="/settings" className="smooth-transition">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="smooth-transition">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
