import * as React from "react"
import { Search, Filter, Download, ChevronDown, Activity, User, Eye, History } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function AuditLogs() {
  const logs = [
    { id: "AL-8092", user: "Admin", action: "UPDATE", entity: "Role: Dispatcher", timestamp: "2023-10-16 14:30:22", ip: "192.168.1.45" },
    { id: "AL-8091", user: "Sarah Connor", action: "DELETE", entity: "Document: Ins_2022.pdf", timestamp: "2023-10-16 11:15:05", ip: "10.0.0.12" },
    { id: "AL-8090", user: "Mike Johnson", action: "CREATE", entity: "Trip: TRP-9002", timestamp: "2023-10-16 09:42:18", ip: "10.0.0.55" },
    { id: "AL-8089", user: "Alice Smith", action: "UPDATE", entity: "Expense: EXP-1004", timestamp: "2023-10-15 16:20:11", ip: "192.168.1.101" },
    { id: "AL-8088", user: "System", action: "CRON", entity: "Data Backup: Daily", timestamp: "2023-10-15 00:00:00", ip: "localhost" },
  ]

  const getActionColor = (action: string) => {
    switch(action) {
      case 'CREATE': return 'bg-green-100 text-green-700 dark:bg-green-900/30'
      case 'UPDATE': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
      case 'DELETE': return 'bg-red-100 text-red-700 dark:bg-red-900/30'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800'
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Audit Logs</h1>
          <p className="text-text-muted mt-1">Immutable record of all system events and data modifications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <Download className="h-4 w-4" /> Export Logs
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col">
         {/* Toolbar */}
         <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <Input className="pl-9 h-9" placeholder="Search by event ID, user, or entity..." />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
               <Button variant="outline" size="sm" className="gap-2 text-gray-600"><User className="h-4 w-4" /> User</Button>
               <Button variant="outline" size="sm" className="gap-2 text-gray-600"><Activity className="h-4 w-4" /> Action</Button>
               <Button variant="outline" size="sm" className="gap-2 text-gray-600"><Filter className="h-4 w-4" /> More Filters</Button>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                 <tr>
                   <th className="px-6 py-4 font-medium">Event ID</th>
                   <th className="px-6 py-4 font-medium">Timestamp</th>
                   <th className="px-6 py-4 font-medium">User</th>
                   <th className="px-6 py-4 font-medium">Action</th>
                   <th className="px-6 py-4 font-medium">Entity</th>
                   <th className="px-6 py-4 font-medium">IP Address</th>
                   <th className="px-6 py-4 font-medium text-right">Details</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                 {logs.map(log => (
                   <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 font-mono text-xs">
                     <td className="px-6 py-4 text-gray-500">{log.id}</td>
                     <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{log.timestamp}</td>
                     <td className="px-6 py-4 font-medium font-sans text-gray-900 dark:text-gray-100">{log.user}</td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{log.entity}</td>
                     <td className="px-6 py-4 text-gray-500">{log.ip}</td>
                     <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                           <Eye className="h-4 w-4" />
                        </Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500">
            <div>Showing 1 to 5 of 14,291 entries</div>
            <div className="flex gap-1">
               <Button variant="outline" size="sm" disabled>Previous</Button>
               <Button variant="outline" size="sm">Next</Button>
            </div>
         </div>
      </div>
    </div>
  )
}
