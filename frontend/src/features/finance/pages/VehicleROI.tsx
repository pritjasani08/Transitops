import * as React from "react"
import { Search, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { MOCK_VEHICLE_ROI } from "../utils/mockData"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function VehicleROI() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredROI = MOCK_VEHICLE_ROI.filter(item =>
    item.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Vehicle ROI Analysis</h1>
          <p className="text-text-muted mt-1">Track return on investment and profitability for individual fleet assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Top Performer */}
         <Card className="bg-success-50/50 dark:bg-success-900/10 border-success-200 dark:border-success-800/30">
            <CardHeader className="pb-2">
               <CardTitle className="text-success-800 dark:text-success-400 flex items-center gap-2">
                 <TrendingUp className="h-5 w-5" /> Top Performing Asset
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-2xl font-bold text-success-900 dark:text-success-100">Volvo VNL 860</p>
                   <p className="text-sm text-success-700 dark:text-success-300 font-mono mt-1">V-101</p>
                 </div>
                 <div className="text-right">
                   <p className="text-3xl font-bold text-success-600">20.3%</p>
                   <p className="text-sm text-success-700/70 dark:text-success-300/70">ROI (YTD)</p>
                 </div>
               </div>
            </CardContent>
         </Card>

         {/* Bottom Performer */}
         <Card className="bg-danger-50/50 dark:bg-danger-900/10 border-danger-200 dark:border-danger-800/30">
            <CardHeader className="pb-2">
               <CardTitle className="text-danger-800 dark:text-danger-400 flex items-center gap-2">
                 <TrendingDown className="h-5 w-5" /> Lowest Performing Asset
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-2xl font-bold text-danger-900 dark:text-danger-100">Peterbilt 579</p>
                   <p className="text-sm text-danger-700 dark:text-danger-300 font-mono mt-1">V-103</p>
                 </div>
                 <div className="text-right">
                   <p className="text-3xl font-bold text-danger-600">1.8%</p>
                   <p className="text-sm text-danger-700/70 dark:text-danger-300/70">ROI (YTD)</p>
                 </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Asset Profitability</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search vehicle ID or name..."
                  className="pl-9 bg-gray-50 dark:bg-gray-900 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium text-right">Investment</th>
                  <th className="px-6 py-4 font-medium text-right">Revenue</th>
                  <th className="px-6 py-4 font-medium text-right">Total Cost</th>
                  <th className="px-6 py-4 font-medium text-right">Net Profit</th>
                  <th className="px-6 py-4 font-medium text-right">ROI %</th>
                  <th className="px-6 py-4 font-medium text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredROI.map(item => (
                  <tr key={item.vehicleId} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-text-primary">{item.vehicleName}</p>
                      <p className="text-xs text-text-muted font-mono">{item.vehicleId}</p>
                    </td>
                    <td className="px-6 py-4 text-right text-text-muted">{formatCurrency(item.investment)}</td>
                    <td className="px-6 py-4 text-right font-medium">{formatCurrency(item.revenue)}</td>
                    <td className="px-6 py-4 text-right text-danger-600">{formatCurrency(item.totalCost)}</td>
                    <td className="px-6 py-4 text-right font-bold text-success-600">{formatCurrency(item.profit)}</td>
                    <td className="px-6 py-4 text-right">
                       <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                         item.roiPercentage > 15 ? 'bg-success-100 text-success-700 dark:bg-success-900/30' :
                         item.roiPercentage > 5 ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30' :
                         'bg-danger-100 text-danger-700 dark:bg-danger-900/30'
                       }`}>
                         {item.roiPercentage}%
                       </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex justify-center">
                         {item.trend === 'Up' && <TrendingUp className="h-5 w-5 text-success-500" />}
                         {item.trend === 'Stable' && <Activity className="h-5 w-5 text-warning-500" />}
                         {item.trend === 'Down' && <TrendingDown className="h-5 w-5 text-danger-500" />}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredROI.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-muted">No vehicles found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
