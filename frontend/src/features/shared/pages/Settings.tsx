import * as React from "react"
import { Building, Users, Shield, Bell, Palette, Globe, Database, Key, Check } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"

export function Settings() {
  const [activeTab, setActiveTab] = React.useState("company")
  
  const tabs = [
    { id: "company", label: "Company Profile", icon: Building },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "localization", label: "Localization", icon: Globe },
    { id: "backup", label: "Data & Backup", icon: Database },
    { id: "api", label: "API Keys", icon: Key },
  ]

  return (
    <div className="space-y-6 pb-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Enterprise Settings</h1>
          <p className="text-text-muted mt-1">Configure global application preferences and organization details.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Check className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar */}
         <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  activeTab === tab.id 
                    ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
         </div>

         {/* Content Area (Mocking just one or two tabs for structural representation) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                 {tabs.find(t => t.id === activeTab)?.label}
               </h3>
               
               {activeTab === 'company' && (
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                          <input type="text" className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900" defaultValue="TransitHub Enterprise" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</label>
                          <input type="text" className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900" defaultValue="TH-90210-CR" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Headquarters Address</label>
                          <input type="text" className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900" defaultValue="100 Logistics Way, Suite 400" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                          <input type="text" className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900" defaultValue="Dallas" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State / Province</label>
                          <input type="text" className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-800 dark:bg-gray-900" defaultValue="TX" />
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'appearance' && (
                 <div className="space-y-6">
                    <div>
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Theme Preference</label>
                       <div className="grid grid-cols-3 gap-4">
                          <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-600 bg-gray-50 dark:bg-gray-900">
                             <div className="h-12 w-full bg-white dark:bg-gray-950 rounded-md border shadow-sm"></div>
                             <span className="text-sm font-medium">Light</span>
                          </button>
                          <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                             <div className="h-12 w-full bg-gray-900 rounded-md shadow-sm"></div>
                             <span className="text-sm font-medium">Dark</span>
                          </button>
                          <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                             <div className="h-12 w-full bg-gradient-to-r from-gray-100 to-gray-800 rounded-md shadow-sm"></div>
                             <span className="text-sm font-medium">System Default</span>
                          </button>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab !== 'company' && activeTab !== 'appearance' && (
                 <div className="py-12 text-center">
                    <p className="text-gray-500">Settings module for {activeTab} is currently under construction.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  )
}
