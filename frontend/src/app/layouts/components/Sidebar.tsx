import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "../../../shared/utils/cn"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { LogOut, Settings, User } from "lucide-react"

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
}

export function Sidebar({ title, items }: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  
  // Extract the base workspace path (e.g., '/fleet', '/dispatch')
  const workspacePath = `/${location.pathname.split('/')[1] || 'fleet'}`

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border-subtle bg-surface-100">
      <div className="flex h-16 items-center px-6 font-semibold text-lg text-text-primary">
        <div className="h-8 w-8 rounded-lg bg-primary mr-3 flex items-center justify-center text-white">
          <span className="font-bold text-sm">TH</span>
        </div>
        TransitHub
      </div>
      
      <div className="px-6 py-2">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
          {title}
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto pb-4">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === workspacePath}
            className={({ isActive }) =>
              cn(
                "group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                  : "text-text-muted hover:bg-surface-200 hover:text-text-primary"
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border-subtle p-4">
        <NavLink 
           to={`${workspacePath}/profile`}
           className={({ isActive }) => cn("flex items-center gap-3 px-2 mb-4 p-2 rounded-xl transition-colors", isActive ? "bg-surface-200" : "hover:bg-surface-200")}
        >
          <div className="h-10 w-10 rounded-full bg-surface-200 flex items-center justify-center">
            <User className="h-5 w-5 text-text-muted" />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium text-text-primary truncate">{user?.name}</span>
            <span className="text-xs text-text-muted truncate capitalize">{user?.role?.replace('_', ' ')}</span>
          </div>
        </NavLink>
        
        <div className="space-y-1">
          <NavLink 
            to={`${workspacePath}/settings`}
            className={({ isActive }) => cn("w-full group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all", isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-surface-200 hover:text-text-primary")}
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            Settings
          </NavLink>
          <button 
            onClick={logout}
            className="w-full group flex items-center rounded-xl px-3 py-2 text-sm font-medium text-text-muted hover:bg-danger-500/10 hover:text-danger-500 transition-all"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
