import * as React from "react"
import { Download, Upload, FileSpreadsheet, FileText, Printer, History, RefreshCcw } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"

export function ImportExportCenter() {
  return (
    <div className="space-y-6 pb-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Data Import & Export</h1>
          <p className="text-text-muted mt-1">Bulk manage enterprise data via CSV, Excel, and PDF formats.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Import Section */}
         <Card className="border-dashed border-2 border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <CardHeader className="text-center pb-2">
               <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8" />
               </div>
               <CardTitle>Import Data</CardTitle>
               <CardDescription>Upload CSV or Excel files to bulk create records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
               <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 gap-2 text-gray-700 dark:text-gray-300">
                     <FileSpreadsheet className="h-5 w-5 text-green-600" /> Import Excel
                  </Button>
                  <Button variant="outline" className="h-12 gap-2 text-gray-700 dark:text-gray-300">
                     <FileText className="h-5 w-5 text-gray-500" /> Import CSV
                  </Button>
               </div>
               <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-center">
                  <p className="text-gray-500 mb-2">Supported modules for import:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                     <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Vehicles</span>
                     <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Drivers</span>
                     <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Expenses</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Export Section */}
         <Card>
            <CardHeader className="text-center pb-2">
               <div className="mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Download className="h-8 w-8" />
               </div>
               <CardTitle>Export Data</CardTitle>
               <CardDescription>Download system data for offline analysis and reporting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-12 gap-2 text-gray-700 dark:text-gray-300">
                     <FileSpreadsheet className="h-4 w-4 text-green-600" /> Excel
                  </Button>
                  <Button variant="outline" className="h-12 gap-2 text-gray-700 dark:text-gray-300">
                     <FileText className="h-4 w-4 text-gray-500" /> CSV
                  </Button>
                  <Button variant="outline" className="h-12 gap-2 text-gray-700 dark:text-gray-300">
                     <FileText className="h-4 w-4 text-red-500" /> PDF
                  </Button>
               </div>
               <div className="flex items-center justify-center gap-4 pt-4">
                  <Button variant="ghost" className="gap-2 text-gray-600">
                     <Printer className="h-4 w-4" /> Print Current View
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* History */}
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Transfer History</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                     <tr>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Module</th>
                        <th className="px-6 py-3 font-medium">Filename</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Records</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-3">
                           <span className="flex items-center gap-1 text-green-600 font-semibold text-xs"><Download className="h-3 w-3" /> EXPORT</span>
                        </td>
                        <td className="px-6 py-3 text-gray-600">Finance</td>
                        <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">Q3_Expenses.xlsx</td>
                        <td className="px-6 py-3 text-gray-500">Oct 16, 2023</td>
                        <td className="px-6 py-3"><span className="text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded">Completed</span></td>
                        <td className="px-6 py-3 text-right text-gray-500">1,204</td>
                     </tr>
                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-3">
                           <span className="flex items-center gap-1 text-blue-600 font-semibold text-xs"><Upload className="h-3 w-3" /> IMPORT</span>
                        </td>
                        <td className="px-6 py-3 text-gray-600">Fleet</td>
                        <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">new_vehicles_bulk.csv</td>
                        <td className="px-6 py-3 text-gray-500">Oct 15, 2023</td>
                        <td className="px-6 py-3"><span className="text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded">Completed</span></td>
                        <td className="px-6 py-3 text-right text-gray-500">25</td>
                     </tr>
                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-3">
                           <span className="flex items-center gap-1 text-blue-600 font-semibold text-xs"><Upload className="h-3 w-3" /> IMPORT</span>
                        </td>
                        <td className="px-6 py-3 text-gray-600">Safety</td>
                        <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">incident_logs_legacy.csv</td>
                        <td className="px-6 py-3 text-gray-500">Oct 14, 2023</td>
                        <td className="px-6 py-3"><span className="text-xs bg-danger-100 text-danger-700 px-2 py-0.5 rounded">Failed (3 errors)</span></td>
                        <td className="px-6 py-3 text-right text-gray-500">89 / 92</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
