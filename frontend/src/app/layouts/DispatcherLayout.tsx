import { Outlet } from "react-router-dom"
import { Sidebar, SidebarItem } from "./components/Sidebar"
import { TopNavbar } from "./components/TopNavbar"
import { LayoutDashboard, Map, Navigation, Clock, KanbanSquare, BarChart3 } from "lucide-react"

const dispatchItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dispatch", icon: LayoutDashboard },
  { name: "Live Board", href: "/dispatch/board", icon: KanbanSquare },
  { name: "Trip Management", href: "/dispatch/trips", icon: Navigation },
  { name: "Route Planner", href: "/dispatch/map", icon: Map },
  { name: "Analytics", href: "/dispatch/analytics", icon: BarChart3 },
  { name: "History", href: "/dispatch/history", icon: Clock },
]

export function DispatcherLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Dispatch Workspace" items={dispatchItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
