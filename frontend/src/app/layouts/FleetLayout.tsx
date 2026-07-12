import { useOutlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  const location = useLocation()
  const outlet = useOutlet()
  
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Fleet Workspace" items={fleetItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
