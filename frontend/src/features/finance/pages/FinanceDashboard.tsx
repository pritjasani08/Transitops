import * as React from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Fuel, 
  Wrench,
  BarChart3,
  Download,
  Plus
} from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { FinanceKPICard } from "../components/FinanceKPICard"
import { MOCK_FINANCE_KPIS } from "../utils/mockData"

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function FinanceDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Financial Intelligence</h1>
          </div>
          <p className="text-text-muted">Welcome back, Finance Analyst. Here is your overview for the month.</p>
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

      {/* KPI Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <FinanceKPICard 
            title="Total Expenses" 
            value={formatCurrency(MOCK_FINANCE_KPIS.totalExpenses)} 
            icon={DollarSign}
            trend="12%"
            trendUp={false}
            colorClass="text-danger-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard 
            title="Operational Cost" 
            value={formatCurrency(MOCK_FINANCE_KPIS.operationalCost)} 
            icon={BarChart3}
            trend="5%"
            trendUp={true}
            colorClass="text-blue-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard 
            title="Fuel Cost" 
            value={formatCurrency(MOCK_FINANCE_KPIS.fuelCost)} 
            icon={Fuel}
            trend="8%"
            trendUp={false}
            colorClass="text-warning-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FinanceKPICard 
            title="Profit Indicator" 
            value={`${MOCK_FINANCE_KPIS.profitIndicator}%`} 
            icon={TrendingUp}
            trend="2.4%"
            trendUp={true}
            colorClass="text-success-600"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                   <div className="flex items-center gap-3 mb-2">
                     <TrendingUp className="h-5 w-5 text-success-500" />
                     <h4 className="font-semibold text-text-primary">Highest ROI Vehicle</h4>
                   </div>
                   <p className="text-xl font-bold">{MOCK_FINANCE_KPIS.highestROIVehicle}</p>
                   <p className="text-sm text-text-muted mt-1">Leading in profitability this month</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                   <div className="flex items-center gap-3 mb-2">
                     <TrendingDown className="h-5 w-5 text-danger-500" />
                     <h4 className="font-semibold text-text-primary">Lowest ROI Vehicle</h4>
                   </div>
                   <p className="text-xl font-bold">{MOCK_FINANCE_KPIS.lowestROIVehicle}</p>
                   <p className="text-sm text-text-muted mt-1">Requires immediate cost analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Health</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                 <svg className="transform -rotate-90 w-32 h-32">
                   <circle className="text-gray-100 dark:text-gray-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                   <circle className="text-success-500" strokeWidth="12" strokeDasharray="351.8" strokeDashoffset={`${351.8 - (MOCK_FINANCE_KPIS.financialHealthScore / 100) * 351.8}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                   <span className="text-2xl font-bold text-text-primary">{MOCK_FINANCE_KPIS.financialHealthScore}</span>
                   <span className="text-xs text-text-muted">Score</span>
                 </div>
              </div>
              <p className="text-sm text-center text-text-muted">Your fleet's financial health is excellent, driven by low maintenance overhead and high vehicle utilization.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
