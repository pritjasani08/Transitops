import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Wrench, 
  PieChart, 
  Route, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  DollarSign,
  Activity,
} from "lucide-react"

export type RoleId = "fleet_manager" | "dispatcher" | "safety_officer" | "financial_analyst" | "driver"

export interface SidebarItem {
  name: string
  href: string
  icon: any
}

export interface RoleConfig {
  id: RoleId
  label: string
  description: string
  defaultRoute: string
  workspace: string
  permissions: string[]
  sidebar: SidebarItem[]
}

export const ROLE_CONFIGURATION: Record<RoleId, RoleConfig> = {
  fleet_manager: {
    id: "fleet_manager",
    label: "Fleet Manager",
    description: "Manage vehicles, drivers and daily fleet operations.",
    defaultRoute: "/fleet",
    workspace: "Fleet",
    permissions: ["fleet:read", "fleet:write", "vehicles:read", "vehicles:write", "maintenance:read", "maintenance:write"],
    sidebar: [
      { name: "Dashboard", href: "/fleet", icon: LayoutDashboard },
      { name: "Vehicles", href: "/fleet/registry", icon: Car },
      { name: "Drivers", href: "/safety/drivers", icon: Users },
      { name: "Maintenance", href: "/fleet/maintenance", icon: Wrench },
      { name: "Finance", href: "/finance", icon: DollarSign },
    ]
  },
  dispatcher: {
    id: "dispatcher",
    label: "Dispatcher",
    description: "Assign vehicles and drivers to trips while monitoring live dispatch.",
    defaultRoute: "/dispatch",
    workspace: "Dispatch",
    permissions: ["dispatch:read", "dispatch:write", "trips:read", "trips:write", "vehicles:read"],
    sidebar: [
      { name: "Dashboard", href: "/dispatch", icon: LayoutDashboard },
      { name: "Trips", href: "/dispatch/trips", icon: Route },
      { name: "Dispatch", href: "/dispatch/board", icon: Activity },
      { name: "Vehicles", href: "/fleet/registry", icon: Car },
    ]
  },
  safety_officer: {
    id: "safety_officer",
    label: "Safety Officer",
    description: "Manage compliance, licenses and maintenance schedules.",
    defaultRoute: "/safety",
    workspace: "Safety",
    permissions: ["safety:read", "safety:write", "compliance:read", "compliance:write", "drivers:read"],
    sidebar: [
      { name: "Dashboard", href: "/safety", icon: LayoutDashboard },
      { name: "Drivers", href: "/safety/drivers", icon: Users },
      { name: "Compliance", href: "/safety/compliance", icon: ShieldCheck },
      { name: "Maintenance", href: "/fleet/maintenance", icon: Wrench },
    ]
  },
  financial_analyst: {
    id: "financial_analyst",
    label: "Financial Analyst",
    description: "Monitor expenses, reports and operational costs.",
    defaultRoute: "/finance",
    workspace: "Finance",
    permissions: ["finance:read", "finance:write", "expenses:read", "reports:read"],
    sidebar: [
      { name: "Dashboard", href: "/finance", icon: LayoutDashboard },
      { name: "Expenses", href: "/finance/expenses", icon: DollarSign },
      { name: "Reports", href: "/finance/reports", icon: PieChart },
      { name: "Analytics", href: "/finance/analytics", icon: TrendingUp },
    ]
  },
  driver: {
    id: "driver",
    label: "Driver",
    description: "Access assigned trips and delivery information.",
    defaultRoute: "/driver",
    workspace: "Driver",
    permissions: ["trips:read", "profile:read"],
    sidebar: [
      { name: "My Trips", href: "/driver/trips", icon: Route },
      { name: "Assigned Vehicle", href: "/driver/vehicle", icon: Car },
      { name: "Trip History", href: "/driver/history", icon: Clock },
      { name: "Profile", href: "/driver/profile", icon: Users },
    ]
  }
}
