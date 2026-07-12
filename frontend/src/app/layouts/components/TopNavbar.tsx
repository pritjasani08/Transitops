import * as React from "react"
import { Bell, Search, Sun, Moon, User, LogOut, Settings, ChevronDown, Check } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { CommandCenter } from "../../../features/shared/components/CommandCenter"
import { useAuth } from "../../../shared/contexts/AuthContext"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { DevelopmentRoleSwitcher } from "../../../features/auth/dev/DevelopmentRoleSwitcher"

export function TopNavbar() {
  const [isCommandOpen, setIsCommandOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const workspacePath = `/${location.pathname.split('/')[1] || 'fleet'}`

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border-subtle bg-surface-100/80 px-6 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-4">
          <div className="text-sm font-medium text-text-muted flex items-center">
            TransitHub <span className="mx-2">/</span> <span className="text-text-primary capitalize">{workspacePath.replace('/', '')} Workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center justify-between w-48 md:w-64 lg:w-80 rounded-full border border-border-subtle bg-surface-200 px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-100"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search...</span>
            </div>
            <kbd className="hidden rounded border border-border-subtle bg-surface-100 px-1.5 font-mono text-[10px] font-medium text-text-muted sm:inline-block">
              Ctrl K
            </kbd>
          </button>

          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="relative rounded-full p-2 text-text-muted hover:bg-surface-200 hover:text-text-primary transition-colors"
            title="Toggle theme"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>

          <button 
            onClick={() => navigate(`${workspacePath}/notifications`)}
            className="relative rounded-full p-2 text-text-muted hover:bg-surface-200 hover:text-text-primary transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-surface-100" />
          </button>

          <div className="h-6 w-px bg-border-subtle mx-2" />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-3 rounded-full hover:bg-surface-200 p-1 pr-3 outline-none transition-colors">
              <div className="h-8 w-8 rounded-full bg-surface-200 flex items-center justify-center border border-border-subtle">
                <User className="h-4 w-4 text-text-muted" />
              </div>
              <div className="flex flex-col text-left mr-2">
                <span className="text-sm font-semibold text-text-primary leading-tight flex items-center gap-2">
                  {user?.name}
                  {import.meta.env.DEV && (
                    <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm uppercase tracking-wider">DEV</span>
                  )}
                </span>
                <span className="text-[11px] font-medium text-text-muted capitalize">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-text-muted" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                align="end" 
                sideOffset={8}
                className="z-50 w-64 rounded-xl border border-border-subtle bg-surface-100 p-1.5 shadow-lg shadow-black/5 outline-none animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              >
                <DevelopmentRoleSwitcher />
                
                <DropdownMenu.Item 
                  onClick={() => navigate(`${workspacePath}/settings`)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-primary outline-none cursor-pointer hover:bg-surface-200"
                >
                  <Settings className="h-4 w-4 text-text-muted" />
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border-subtle" />
                <DropdownMenu.Item 
                  onClick={logout}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-danger-600 outline-none cursor-pointer hover:bg-danger-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </header>
      <CommandCenter isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  )
}
