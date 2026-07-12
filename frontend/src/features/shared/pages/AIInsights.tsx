import * as React from "react"
import { Sparkles, TrendingUp, ShieldAlert, Truck, DollarSign, Fuel, Activity, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"

export function AIInsights() {
  const insights = [
    {
       category: "Predictive Maintenance",
       icon: Activity,
       color: "text-rose-500",
       bg: "bg-rose-100 dark:bg-rose-900/30",
       title: "Engine Degradation Warning (V-102)",
       description: "Telemetry data indicates a 14% drop in oil pressure over the last 3 trips. Probability of failure within 500 miles is high.",
       recommendation: "Schedule immediate diagnostic and reroute V-102's next long-haul trip.",
       roi: "Saves est. $4,500 in breakdown costs."
    },
    {
       category: "Fuel Optimization",
       icon: Fuel,
       color: "text-amber-500",
       bg: "bg-amber-100 dark:bg-amber-900/30",
       title: "Route Efficiency Drop (TRP-9001)",
       description: "Current routing for TRP-9001 passes through high-idle construction zones identified on I-35.",
       recommendation: "Switch to Alternate Route B. Adds 12 miles but reduces total trip time by 45 mins.",
       roi: "Improves MPG by 0.8 on this trip."
    },
    {
       category: "Safety & Risk Detection",
       icon: ShieldAlert,
       color: "text-red-500",
       bg: "bg-red-100 dark:bg-red-900/30",
       title: "Harsh Braking Pattern Detected",
       description: "Driver ID: D-405 (Mike J.) has triggered 4 harsh braking events in the last 48 hours, correlating with wet weather conditions.",
       recommendation: "Assign targeted safety training module: 'Defensive Driving in Rain'.",
       roi: "Reduces collision risk by 22%."
    },
    {
       category: "Financial ROI",
       icon: DollarSign,
       color: "text-green-500",
       bg: "bg-green-100 dark:bg-green-900/30",
       title: "Asset Underutilization (V-105)",
       description: "V-105 has been idle for 30% of standard operating hours this month, dragging down total fleet ROI.",
       recommendation: "Shift V-105 to the high-volume short-haul queue or consider asset liquidation if trend continues.",
       roi: "Potential +$2,100 revenue/week."
    }
  ]

  return (
    <div className="space-y-6 pb-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 p-8 md:p-12 text-white shadow-xl">
         <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="h-64 w-64 text-white" />
         </div>
         <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
               <Sparkles className="h-3 w-3" /> TransitHub AI Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Enterprise AI Insights</h1>
            <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
               Our proprietary machine learning models continuously analyze telemetry, financial logs, and dispatch histories to generate actionable, high-ROI recommendations.
            </p>
            <div className="flex flex-wrap gap-4">
               <Button className="bg-white text-indigo-950 hover:bg-indigo-50 font-semibold px-6 h-12">
                  Generate Full Report
               </Button>
               <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12">
                  Customize Insight Weights
               </Button>
            </div>
         </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">14</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Insights</p>
         </div>
         <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            <h4 className="text-3xl font-bold text-success-600 mb-1">$12.4k</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Savings</p>
         </div>
         <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-1">98%</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction Accuracy</p>
         </div>
         <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            <h4 className="text-3xl font-bold text-purple-600 mb-1">1.2M</h4>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Points Analyzed</p>
         </div>
      </div>

      {/* Insights Feed */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">High Priority Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {insights.map((insight, idx) => (
            <Card key={idx} className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
               <CardHeader className="bg-gray-50/50 dark:bg-gray-900/20 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${insight.bg} ${insight.color}`}>
                        <insight.icon className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{insight.category}</p>
                        <CardTitle className="text-lg mt-0.5">{insight.title}</CardTitle>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  <div>
                     <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{insight.description}</p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 p-4 rounded-xl">
                     <div className="flex items-start gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold text-blue-900 dark:text-blue-300 text-sm">AI Recommendation</span>
                     </div>
                     <p className="text-sm text-blue-800 dark:text-blue-400 pl-6">{insight.recommendation}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                     <div className="flex items-center gap-2 text-success-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">{insight.roi}</span>
                     </div>
                     <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">Apply Action &rarr;</Button>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  )
}
