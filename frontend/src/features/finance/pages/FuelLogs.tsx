import * as React from "react"
import { Search, Filter, Fuel, Plus, TrendingDown, DollarSign } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { axiosInstance } from "../../../services/api/axios"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function FuelLogs() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [fuelLogs, setFuelLogs] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [totalFuelCost, setTotalFuelCost] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/fuel')
        const data = res.data.data || []
        setFuelLogs(data)
        
        const cost = data.reduce((acc: number, log: any) => acc + parseFloat(log.cost || 0), 0)
        setTotalFuelCost(cost)
      } catch (e) {
        console.error("Failed to load fuel logs")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredLogs = fuelLogs.filter(log =>
    log.vehicle_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.station_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Fuel Management</h1>
          <p className="text-text-muted mt-1">Live from database: Monitor fleet fuel consumption and efficiency metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Add Fuel Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Fuel Cost</p>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatCurrency(totalFuelCost)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success-50 text-success-600 dark:bg-success-900/20">
                <Fuel className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">Total Entries</p>
                <h3 className="text-2xl font-bold text-text-primary">
                  {fuelLogs.length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning-50 text-warning-600 dark:bg-warning-900/20">
                <TrendingDown className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">Avg Cost / Liter</p>
                <h3 className="text-2xl font-bold text-text-primary">
                  {fuelLogs.length > 0 ? formatCurrency(totalFuelCost / fuelLogs.reduce((acc, log) => acc + parseFloat(log.liters || 0), 0)) : '$0.00'}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Recent Fuel Entries</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search vehicle or location..."
                  className="pl-9 bg-gray-50 dark:bg-gray-900 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Vehicle ID</th>
                  <th className="px-6 py-4 font-medium">Station</th>
                  <th className="px-6 py-4 font-medium text-right">Liters</th>
                  <th className="px-6 py-4 font-medium text-right">Total Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                   <tr><td colSpan={5} className="text-center py-8 text-text-muted">Loading live database logs...</td></tr>
                ) : filteredLogs.length === 0 ? (
                   <tr><td colSpan={5} className="text-center py-8 text-text-muted">No fuel logs found in database.</td></tr>
                ) : filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">{new Date(log.filled_date || log.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-text-primary">{log.vehicle_id.substring(0,8)}</td>
                    <td className="px-6 py-4 text-text-muted">{log.station_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-right font-mono">{parseFloat(log.liters).toFixed(2)} L</td>
                    <td className="px-6 py-4 text-right font-semibold text-text-primary">{formatCurrency(parseFloat(log.cost))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
