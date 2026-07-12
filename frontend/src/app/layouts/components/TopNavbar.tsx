import * as React from "react"
import { Bell, Search } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { CommandCenter } from "../../../features/shared/components/CommandCenter"

export function TopNavbar() {
  const [isCommandOpen, setIsCommandOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
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
            className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-200 px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-100"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 hidden rounded border border-border-subtle bg-surface-100 px-1.5 font-mono text-[10px] font-medium text-text-muted sm:inline-block">
              Ctrl K
            </kbd>
          </button>

          <button 
            onClick={() => navigate(`${workspacePath}/notifications`)}
            className="relative rounded-full p-2 text-text-muted hover:bg-surface-200 hover:text-text-primary transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-surface-100" />
          </button>
        </div>
      </header>
      <CommandCenter isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  )
}
