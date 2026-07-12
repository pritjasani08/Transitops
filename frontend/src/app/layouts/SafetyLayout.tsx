import { Outlet } from "react-router-dom"
import { Sidebar, SidebarItem } from "./components/Sidebar"
import { TopNavbar } from "./components/TopNavbar"
import { Shield, FileCheck, AlertTriangle, Users, BookOpen, ShieldAlert, BarChart3 } from "lucide-react"

const safetyItems: SidebarItem[] = [
  { name: "Dashboard", href: "/safety", icon: Shield },
  { name: "Driver Directory", href: "/safety/drivers", icon: Users },
  { name: "License Monitor", href: "/safety/licenses", icon: FileCheck },
  { name: "Compliance Center", href: "/safety/compliance", icon: ShieldAlert },
  { name: "Incident Center", href: "/safety/incidents", icon: AlertTriangle },
  { name: "Analytics", href: "/safety/analytics", icon: BarChart3 },
  { name: "Reports", href: "/safety/reports", icon: BookOpen },
]

export function SafetyLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Safety Workspace" items={safetyItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
