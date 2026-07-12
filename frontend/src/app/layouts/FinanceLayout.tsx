import { Outlet } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
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



export function FinanceLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

