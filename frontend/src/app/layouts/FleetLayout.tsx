import { Outlet } from "react-router-dom"
import { Sidebar, SidebarItem } from "./components/Sidebar"
import { TopNavbar } from "./components/TopNavbar"
import { LayoutDashboard, Truck, Wrench, FileText, BarChart3, FileLineChart } from "lucide-react"

const fleetItems: SidebarItem[] = [
  { name: "Fleet Overview", href: "/fleet", icon: LayoutDashboard },
  { name: "Vehicle Registry", href: "/fleet/registry", icon: Truck },
  { name: "Maintenance", href: "/fleet/maintenance", icon: Wrench },
  { name: "Documents", href: "/fleet/documents", icon: FileText },
  { name: "Analytics", href: "/fleet/analytics", icon: BarChart3 },
  { name: "Reports", href: "/fleet/reports", icon: FileLineChart },
]

export function FleetLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Fleet Workspace" items={fleetItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
