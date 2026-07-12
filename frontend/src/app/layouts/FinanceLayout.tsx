import { Outlet } from "react-router-dom"
import { Sidebar, SidebarItem } from "./components/Sidebar"
import { TopNavbar } from "./components/TopNavbar"
import { 
  LineChart, 
  DollarSign, 
  Fuel, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Download 
} from "lucide-react"

const financeItems: SidebarItem[] = [
  { name: "Dashboard", href: "/finance", icon: LineChart },
  { name: "Expense Management", href: "/finance/expenses", icon: DollarSign },
  { name: "Fuel Logs", href: "/finance/fuel", icon: Fuel },
  { name: "Operational Cost", href: "/finance/costs", icon: Activity },
  { name: "Vehicle ROI", href: "/finance/roi", icon: TrendingUp },
  { name: "Analytics", href: "/finance/analytics", icon: BarChart3 },
  { name: "Reports", href: "/finance/reports", icon: FileText },
  { name: "Export Center", href: "/finance/export", icon: Download },
]

export function FinanceLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar title="Finance Workspace" items={financeItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
