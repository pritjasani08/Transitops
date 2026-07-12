import * as React from "react"
import { Shield, Plus, Users, Settings, Edit, Trash2, Check, X } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"

export function RoleManagement() {
  const [activeRole, setActiveRole] = React.useState("Fleet Manager")

  const roles = [
    { id: "admin", name: "System Admin", users: 2, type: "System" },
    { id: "fleet_manager", name: "Fleet Manager", users: 5, type: "Custom" },
    { id: "dispatcher", name: "Dispatcher", users: 12, type: "Custom" },
    { id: "safety_officer", name: "Safety Officer", users: 3, type: "Custom" },
    { id: "finance", name: "Financial Analyst", users: 4, type: "Custom" },
  ]

  const permissions = [
    { module: "Vehicles", scopes: ["View", "Create", "Edit", "Delete"] },
    { module: "Trips", scopes: ["View", "Create", "Edit", "Delete", "Assign"] },
    { module: "Drivers", scopes: ["View", "Create", "Edit", "Delete"] },
    { module: "Expenses", scopes: ["View", "Create", "Edit", "Approve"] },
    { module: "Reports", scopes: ["View", "Export", "Create Custom"] },
  ]

  // Mocking the permission matrix state for a role
  const hasPermission = (module: string, scope: string) => {
    if (activeRole === "System Admin") return true;
    if (activeRole === "Fleet Manager" && ["Vehicles", "Drivers", "Reports"].includes(module)) return true;
    if (activeRole === "Dispatcher" && ["Trips", "Vehicles"].includes(module)) return scope !== "Delete";
    if (activeRole === "Financial Analyst" && ["Expenses", "Reports"].includes(module)) return true;
    return false;
  }

  return (
    <div className="space-y-6 pb-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Role Management</h1>
          <p className="text-text-muted mt-1">Configure RBAC policies and permission matrices.</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
           <Plus className="h-4 w-4" /> Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Roles List */}
         <div className="space-y-4">
            <Card>
               <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-lg">Active Roles</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                     {roles.map(role => (
                        <div 
                           key={role.id}
                           onClick={() => setActiveRole(role.name)}
                           className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50 ${activeRole === role.name ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                        >
                           <div className="flex justify-between items-center mb-1">
                              <h4 className={`font-semibold ${activeRole === role.name ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>{role.name}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${role.type === 'System' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 dark:bg-gray-800'}`}>
                                 {role.type}
                              </span>
                           </div>
                           <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Users className="h-3 w-3" /> {role.users} Users Assigned
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Permission Matrix */}
         <div className="lg:col-span-3">
            <Card className="h-full">
               <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                     <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-blue-600" /> {activeRole}</CardTitle>
                     <CardDescription>Configure access rights across enterprise modules.</CardDescription>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="gap-2 text-gray-600 hover:text-blue-600"><Edit className="h-4 w-4" /> Edit Role</Button>
                     {activeRole !== "System Admin" && (
                        <Button variant="outline" size="sm" className="gap-2 text-gray-600 hover:text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-4 w-4" /> Delete</Button>
                     )}
                  </div>
               </CardHeader>
               <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                           <th className="px-6 py-4 font-semibold">Module</th>
                           <th className="px-6 py-4 font-semibold text-center">View</th>
                           <th className="px-6 py-4 font-semibold text-center">Create</th>
                           <th className="px-6 py-4 font-semibold text-center">Edit</th>
                           <th className="px-6 py-4 font-semibold text-center">Delete</th>
                           <th className="px-6 py-4 font-semibold text-center">Special</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {permissions.map((p, i) => (
                           <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{p.module}</td>
                              
                              {/* View */}
                              <td className="px-6 py-4 text-center">
                                 {hasPermission(p.module, "View") 
                                    ? <Check className="h-5 w-5 mx-auto text-success-500" /> 
                                    : <X className="h-4 w-4 mx-auto text-gray-300 dark:text-gray-700" />}
                              </td>
                              
                              {/* Create */}
                              <td className="px-6 py-4 text-center">
                                 {p.scopes.includes("Create") ? (
                                    hasPermission(p.module, "Create") 
                                       ? <Check className="h-5 w-5 mx-auto text-success-500" /> 
                                       : <X className="h-4 w-4 mx-auto text-gray-300 dark:text-gray-700" />
                                 ) : <span className="text-gray-300">-</span>}
                              </td>

                              {/* Edit */}
                              <td className="px-6 py-4 text-center">
                                 {p.scopes.includes("Edit") ? (
                                    hasPermission(p.module, "Edit") 
                                       ? <Check className="h-5 w-5 mx-auto text-success-500" /> 
                                       : <X className="h-4 w-4 mx-auto text-gray-300 dark:text-gray-700" />
                                 ) : <span className="text-gray-300">-</span>}
                              </td>

                              {/* Delete */}
                              <td className="px-6 py-4 text-center">
                                 {p.scopes.includes("Delete") ? (
                                    hasPermission(p.module, "Delete") 
                                       ? <Check className="h-5 w-5 mx-auto text-success-500" /> 
                                       : <X className="h-4 w-4 mx-auto text-gray-300 dark:text-gray-700" />
                                 ) : <span className="text-gray-300">-</span>}
                              </td>

                              {/* Special */}
                              <td className="px-6 py-4 text-center">
                                 {p.scopes.find(s => !["View", "Create", "Edit", "Delete"].includes(s)) ? (
                                    <div className="flex items-center justify-center gap-1">
                                       <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded dark:bg-blue-900/30">
                                          {p.scopes.find(s => !["View", "Create", "Edit", "Delete"].includes(s))}
                                       </span>
                                       {hasPermission(p.module, p.scopes.find(s => !["View", "Create", "Edit", "Delete"].includes(s))!) 
                                          ? <Check className="h-4 w-4 text-success-500" /> 
                                          : <X className="h-4 w-4 text-gray-300 dark:text-gray-700" />}
                                    </div>
                                 ) : <span className="text-gray-300">-</span>}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  
                  <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 text-center">
                     <p className="text-sm text-gray-500 mb-3">Changes to role permissions apply to all assigned users immediately.</p>
                     <Button className="w-full sm:w-auto">Save Permission Matrix</Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  )
}
