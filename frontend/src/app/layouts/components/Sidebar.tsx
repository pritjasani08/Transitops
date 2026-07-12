import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "../../../shared/utils/cn"
import { useAuth } from "../../../shared/contexts/AuthContext"
import { ROLE_CONFIGURATION, RoleId } from "../../../shared/config/roles/roleConfiguration"

export function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()
  
  const roleConfig = user?.role ? ROLE_CONFIGURATION[user.role as RoleId] : null
  const items = roleConfig?.sidebar || []
  const title = roleConfig?.workspace ? `${roleConfig.workspace} Workspace` : "Workspace"
  
  // Extract the base workspace path
  const workspacePath = `/${location.pathname.split('/')[1] || 'fleet'}`

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border-subtle bg-surface-100 dark:bg-gray-900">
      <div className="flex h-16 items-center px-6 font-semibold text-lg text-text-primary tracking-tight">
        <div className="h-8 w-8 rounded-lg bg-primary mr-3 flex items-center justify-center text-white shadow-md shadow-primary/20 ring-1 ring-primary/50">
          <span className="font-bold text-sm">TH</span>
        </div>
        TransitOps
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
                "group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 shadow-sm font-semibold border-r-2 border-primary"
                  : "text-text-muted hover:bg-surface-200 hover:text-text-primary dark:hover:bg-gray-800/50"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200", isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300")} aria-hidden="true" />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
