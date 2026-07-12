import * as React from "react"
import { Search, Filter, Check, Trash2, Archive, Bell, Truck, AlertTriangle, DollarSign, Activity } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function NotificationCenter() {
  const [activeTab, setActiveTab] = React.useState("inbox")
  const [searchTerm, setSearchTerm] = React.useState("")

  const tabs = [
    { id: "inbox", label: "Inbox", count: 12 },
    { id: "unread", label: "Unread", count: 5 },
    { id: "fleet", label: "Fleet", icon: Truck },
    { id: "dispatch", label: "Dispatch", icon: Activity },
    { id: "safety", label: "Safety", icon: AlertTriangle },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "system", label: "System", icon: Bell },
    { id: "archive", label: "Archive", icon: Archive },
  ]

  const mockNotifications = [
    { id: 1, title: "Critical Maintenance Due", message: "Vehicle V-101 requires immediate engine inspection.", type: "safety", time: "10 mins ago", read: false },
    { id: 2, title: "Trip Assigned", message: "You have been assigned Trip TRP-9002.", type: "dispatch", time: "1 hour ago", read: false },
    { id: 3, title: "Expense Approved", message: "Fuel expense $450.00 has been approved.", type: "finance", time: "3 hours ago", read: true },
    { id: 4, title: "System Update", message: "TransitHub v2.4 successfully deployed.", type: "system", time: "1 day ago", read: true },
    { id: 5, title: "Document Expiring", message: "Driver License for John Doe expires in 15 days.", type: "fleet", time: "2 days ago", read: true },
  ]

  const filteredNotifications = mockNotifications.filter(n => {
    if (activeTab === "unread" && n.read) return false
    if (activeTab !== "inbox" && activeTab !== "unread" && activeTab !== "archive" && n.type !== activeTab) return false
    if (searchTerm && !n.title.toLowerCase().includes(searchTerm.toLowerCase()) && !n.message.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50/50 flex flex-col dark:border-gray-800 dark:bg-gray-900/50">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold">Notifications</h2>
        </div>
        <div className="p-2 space-y-1 flex-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-colors ${
                activeTab === tab.id 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon && <tab.icon className="h-4 w-4" />}
                {tab.label}
              </div>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-blue-200 dark:bg-blue-800" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Button variant="outline" className="w-full text-xs">Notification Settings</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search notifications..." 
              className="pl-8 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Check className="h-4 w-4" /> Mark All Read
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-500">
               <Bell className="h-12 w-12 mb-4 text-gray-300 dark:text-gray-700" />
               <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No notifications found</p>
               <p className="text-sm">You're all caught up!</p>
             </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`flex gap-4 p-4 rounded-xl border transition-all ${
                  !notif.read 
                    ? "bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30" 
                    : "bg-white border-gray-100 dark:bg-gray-900/50 dark:border-gray-800"
                }`}
              >
                <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!notif.read ? "bg-blue-500" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`font-semibold text-sm truncate ${!notif.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-gray-400 flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{notif.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 hover:opacity-100 transition-opacity">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                     <Check className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                     <Archive className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600">
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
