import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Truck, 
  User, 
  FileText, 
  Settings, 
  Bell, 
  X,
  CreditCard,
  Shield,
  Activity
} from "lucide-react"

interface CommandCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
  const [query, setQuery] = React.useState("")
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // A bit of a hack to trigger open from outside if needed, 
          // but TopNavbar will likely handle the open state.
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm dark:bg-gray-900/60" 
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative z-50 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950 mx-4"
        >
          <div className="flex items-center border-b border-gray-100 px-4 py-4 dark:border-gray-800">
            <Search className="mr-3 h-5 w-5 text-gray-400" />
            <input
              autoFocus
              className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400 dark:text-gray-100"
              placeholder="Search anything, navigate anywhere, or run commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={onClose}
              className="ml-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!query ? (
              <div className="p-4">
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    { icon: Truck, label: "Create Trip", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { icon: User, label: "Add Driver", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
                    { icon: CreditCard, label: "Record Expense", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { icon: FileText, label: "Upload Document", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { icon: Activity, label: "Log Maintenance", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                    { icon: Shield, label: "Report Incident", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-transparent p-4 transition-colors hover:border-gray-200 hover:bg-gray-50 dark:hover:border-gray-800 dark:hover:bg-gray-900"
                      onClick={onClose}
                    >
                      <div className={`rounded-full p-2 ${action.bg} ${action.color}`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
                
                <h3 className="mt-6 mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {["V-101 Maintenance Log", "Driver John Doe", "Q3 Financial Report"].map((term, i) => (
                    <button key={i} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900" onClick={onClose}>
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-4">
                {/* Search Results Mock */}
                <div>
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Vehicles
                  </h3>
                  <div className="space-y-1">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900" onClick={onClose}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">Volvo VNL 860 <span className="text-gray-400 font-normal ml-2">V-101</span></p>
                        <p className="text-xs text-gray-500">Active • Dallas, TX</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Settings
                  </h3>
                  <div className="space-y-1">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900" onClick={onClose}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">Notification Preferences</p>
                        <p className="text-xs text-gray-500">Manage email and push alerts</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">↑</kbd>
                <kbd className="rounded border bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">↓</kbd>
                <span className="ml-1">to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">Enter</kbd>
                <span className="ml-1">to select</span>
              </span>
            </div>
            <span>TransitHub Enterprise</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
