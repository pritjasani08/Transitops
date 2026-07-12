import * as React from "react"
import { User, Mail, Shield, Smartphone, Key, Bell, Sun, Moon } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"

export function Profile() {
  return (
    <div className="space-y-6 pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">My Profile</h1>
          <p className="text-text-muted mt-1">Manage your personal information and security preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sidebar */}
         <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300">
               <User className="h-5 w-5" /> Profile Information
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
               <Shield className="h-5 w-5" /> Security & Login
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
               <Bell className="h-5 w-5" /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
               <Sun className="h-5 w-5" /> Preferences
            </button>
         </div>

         {/* Content */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Personal Details</h3>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-3xl font-bold">
                     JD
                  </div>
                  <div>
                     <Button variant="outline" size="sm" className="mb-2">Change Avatar</Button>
                     <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                     <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                     <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input defaultValue="john.doe@transithub.com" className="pl-9" disabled />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                     <div className="relative">
                        <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input defaultValue="+1 (555) 123-4567" className="pl-9" />
                     </div>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
               </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Connected Accounts</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                     <div className="flex items-center gap-3">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                           <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                        </div>
                        <div>
                           <p className="font-medium text-gray-900 dark:text-gray-100">Google</p>
                           <p className="text-xs text-gray-500">Connected</p>
                        </div>
                     </div>
                     <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20">Disconnect</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
