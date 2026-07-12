import { useOutlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  const location = useLocation()
  const outlet = useOutlet()
  
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Dispatch Workspace" items={dispatchItems} />
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
