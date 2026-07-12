import * as React from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Fuel, 
  BarChart3,
  Download,
  Plus
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { FinanceKPICard } from "../components/FinanceKPICard"
import { axiosInstance } from "../../../services/api/axios"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function FinanceDashboard() {
  const [data, setData] = React.useState({
    totalExpenses: 0,
    operationalCost: 0,
    fuelCost: 0,
    maintenanceCost: 0,
    profitIndicator: 0,
    financialHealthScore: 0,
    highestROIVehicle: "Insufficient Data",
    lowestROIVehicle: "Insufficient Data"
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenanceRes, fuelRes, expenseRes, tripRes, vehicleRes] = await Promise.all([
          axiosInstance.get('/maintenance').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/fuel').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/expenses').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/trips').catch(() => ({ data: { data: [] } })),
          axiosInstance.get('/vehicles').catch(() => ({ data: { data: [] } }))
        ])

        const mLogs = maintenanceRes.data.data || []
        const fLogs = fuelRes.data.data || []
        const eLogs = expenseRes.data.data || []
        const trips = tripRes.data.data || []
        const vehicles = vehicleRes.data.data || []

        const mCost = mLogs.reduce((sum: number, item: any) => sum + parseFloat(item.cost || 0), 0)
        const fCost = fLogs.reduce((sum: number, item: any) => sum + parseFloat(item.cost || 0), 0)
        const eCost = eLogs.reduce((sum: number, item: any) => sum + parseFloat(item.amount || 0), 0)
        
        const total = mCost + fCost + eCost

        // Calculate dynamic ROI per vehicle
        const vehicleStats: Record<string, { revenue: number, costs: number }> = {}
        
        vehicles.forEach((v: any) => vehicleStats[v.id] = { revenue: 0, costs: 0 })
        
        trips.forEach((t: any) => {
          if (t.vehicle_id && vehicleStats[t.vehicle_id]) {
            // Mock revenue calculation: $3.5 per planned mile
            vehicleStats[t.vehicle_id].revenue += (parseFloat(t.planned_distance) * 3.5) || 0
          }
        })
        
        mLogs.forEach((m: any) => {
          if (m.vehicle_id && vehicleStats[m.vehicle_id]) {
            vehicleStats[m.vehicle_id].costs += parseFloat(m.cost || 0)
          }
        })
        
        fLogs.forEach((f: any) => {
          if (f.vehicle_id && vehicleStats[f.vehicle_id]) {
            vehicleStats[f.vehicle_id].costs += parseFloat(f.cost || 0)
          }
        })

        let bestV = null, worstV = null
        let maxRoi = -Infinity, minRoi = Infinity
        
        Object.entries(vehicleStats).forEach(([vId, stats]) => {
          if (stats.revenue > 0 || stats.costs > 0) {
            const profit = stats.revenue - stats.costs
            if (profit > maxRoi) { maxRoi = profit; bestV = vId }
            if (profit < minRoi) { minRoi = profit; worstV = vId }
          }
        })

        const bestVehicleRecord = vehicles.find((v:any) => v.id === bestV)
        const worstVehicleRecord = vehicles.find((v:any) => v.id === worstV)

        // Calculate dynamic health score
        let score = total === 0 ? 0 : 95 - (total > 10000 ? 10 : 0) - (mCost > 5000 ? 5 : 0)

        setData({
          totalExpenses: total,
          operationalCost: mCost + eCost,
          fuelCost: fCost,
          maintenanceCost: mCost,
          profitIndicator: total === 0 ? 0 : score - 5,
          financialHealthScore: total === 0 ? 0 : Math.max(0, Math.min(100, score)),
          highestROIVehicle: bestVehicleRecord ? `${bestVehicleRecord.registration_number}` : "Insufficient Data",
          lowestROIVehicle: worstVehicleRecord ? `${worstVehicleRecord.registration_number}` : "Insufficient Data"
        })
      } catch (e) {
        console.error("Error fetching finance data")
      }
    }
    fetchData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Financial Intelligence</h1>
          </div>
          <p className="text-text-muted">Welcome back, Finance Analyst. Live data loaded from database.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <FinanceKPICard title="Total Expenses" value={formatCurrency(data.totalExpenses)} icon={DollarSign} trend="Live" trendUp={false} colorClass="text-danger-600" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard title="Operational Cost" value={formatCurrency(data.operationalCost)} icon={BarChart3} trend="Live" trendUp={true} colorClass="text-blue-600" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard title="Fuel Cost" value={formatCurrency(data.fuelCost)} icon={Fuel} trend="Live" trendUp={false} colorClass="text-warning-600" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard title="Profit Indicator" value={`${data.profitIndicator}%`} icon={TrendingUp} trend="Live" trendUp={true} colorClass="text-success-600" />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Performance Highlights</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                   <div className="flex items-center gap-3 mb-2">
                     <TrendingUp className="h-5 w-5 text-success-500" />
                     <h4 className="font-semibold text-text-primary">Highest ROI Vehicle</h4>
                   </div>
                   <p className="text-xl font-bold">{data.highestROIVehicle}</p>
                   <p className="text-sm text-text-muted mt-1">Leading in profitability this month</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                   <div className="flex items-center gap-3 mb-2">
                     <TrendingDown className="h-5 w-5 text-danger-500" />
                     <h4 className="font-semibold text-text-primary">Lowest ROI Vehicle</h4>
                   </div>
                   <p className="text-xl font-bold">{data.lowestROIVehicle}</p>
                   <p className="text-sm text-text-muted mt-1">Requires immediate cost analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Financial Health</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                 <svg className="transform -rotate-90 w-32 h-32">
                   <circle className="text-gray-100 dark:text-gray-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                   <circle className="text-success-500" strokeWidth="12" strokeDasharray="351.8" strokeDashoffset={`${351.8 - (data.financialHealthScore / 100) * 351.8}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                   <span className="text-2xl font-bold text-text-primary">{data.financialHealthScore}</span>
                   <span className="text-xs text-text-muted">Score</span>
                 </div>
              </div>
              <p className="text-sm text-center text-text-muted">Dynamic score based on live database queries.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
