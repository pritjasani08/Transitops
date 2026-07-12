import * as React from "react"
import { useParams } from "react-router-dom"
import { Phone, Mail, MapPin, Calendar, FileText, Activity, ShieldAlert, CheckCircle2, AlertTriangle, FileWarning, Download, Edit } from "lucide-react"

import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card"
import { MOCK_DRIVERS } from "../utils/mockData"
import { DriverStatusBadge, LicenseStatusBadge } from "../components/StatusBadges"
import { SafetyScoreRing } from "../components/SafetyScoreRing"

export function DriverProfile() {
  const { id } = useParams()
  // In a real app we'd fetch by ID. Here we'll just grab the first mock if no ID matches.
  const driver = MOCK_DRIVERS.find(d => d.id === id) || MOCK_DRIVERS[0]

  return (
    <div className="space-y-6 pb-8">
      {/* Header Profile Section */}
      <Card className="bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 border-blue-100 dark:border-blue-900/30">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 text-3xl font-bold shrink-0 border-4 border-white dark:border-gray-900 shadow-sm">
                {driver.name.charAt(0)}
              </div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-text-primary">{driver.name}</h1>
                  <DriverStatusBadge status={driver.status} className="text-sm px-2.5 py-0.5" />
                </div>
                <p className="text-lg text-text-muted font-mono">{driver.id}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-muted mt-2">
                  <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {driver.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {driver.phone}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {new Date(driver.joinedDate).getFullYear()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
               <div className="text-center">
                 <p className="text-sm text-text-muted font-medium mb-2">Safety Score</p>
                 <SafetyScoreRing score={driver.safetyScore} size={80} strokeWidth={6} />
               </div>
               <div className="w-px h-16 bg-gray-100 dark:bg-gray-700 mx-2"></div>
               <div className="space-y-2">
                 <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                   <Edit className="h-4 w-4" /> Edit Profile
                 </Button>
                 <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                   <ShieldAlert className="h-4 w-4" /> Suspend
                 </Button>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <FileText className="h-5 w-5 text-blue-500" /> License Information
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">License Number</p>
                  <p className="font-mono text-lg font-medium">{driver.license.number}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Type/Class</p>
                    <p className="font-medium">{driver.license.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">State</p>
                    <p className="font-medium">{driver.license.state}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Expiration Date</p>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{new Date(driver.license.expiryDate).toLocaleDateString()}</p>
                    <LicenseStatusBadge status={driver.license.status} />
                  </div>
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <CheckCircle2 className="h-5 w-5 text-success-500" /> Training Records
               </CardTitle>
             </CardHeader>
             <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="font-bold">{driver.trainingCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${driver.trainingCompletion >= 100 ? 'bg-success-500' : 'bg-blue-600'}`}
                      style={{ width: `${driver.trainingCompletion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                   <div className="flex items-center justify-between text-sm">
                     <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success-500"/> Defensive Driving</span>
                     <span className="text-text-muted">Completed</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success-500"/> Hazmat Safety</span>
                     <span className="text-text-muted">Completed</span>
                   </div>
                   {driver.trainingCompletion < 100 && (
                     <div className="flex items-center justify-between text-sm font-medium text-warning-600">
                       <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4"/> Winter Operations</span>
                       <span>Pending</span>
                     </div>
                   )}
                </div>
             </CardContent>
           </Card>
        </div>

        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
           {/* Quick Stats */}
           <div className="grid grid-cols-3 gap-4">
             <Card>
               <CardContent className="p-4 text-center">
                 <p className="text-sm text-text-muted mb-1">Total Trips</p>
                 <p className="text-2xl font-bold">1,284</p>
               </CardContent>
             </Card>
             <Card>
               <CardContent className="p-4 text-center">
                 <p className="text-sm text-text-muted mb-1">Miles Driven</p>
                 <p className="text-2xl font-bold">45,920</p>
               </CardContent>
             </Card>
             <Card>
               <CardContent className="p-4 text-center">
                 <p className="text-sm text-text-muted mb-1">Incident Rate</p>
                 <p className="text-2xl font-bold text-success-600">0.8%</p>
               </CardContent>
             </Card>
           </div>

           {/* Incident Timeline */}
           <Card>
             <CardHeader>
               <CardTitle>Recent Incidents & Violations</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-3 md:ml-4 space-y-8 py-2">
                  <div className="relative pl-6 md:pl-8">
                     <span className="absolute -left-[11px] top-1 bg-white dark:bg-gray-900 border-2 border-warning-500 w-5 h-5 rounded-full"></span>
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                        <h4 className="font-semibold text-lg text-warning-600">Speeding Violation</h4>
                        <span className="text-sm text-text-muted">Oct 12, 2023</span>
                     </div>
                     <p className="text-text-muted text-sm">Exceeded speed limit by 12mph in construction zone. Warning issued.</p>
                  </div>
                  
                  <div className="relative pl-6 md:pl-8">
                     <span className="absolute -left-[11px] top-1 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 w-5 h-5 rounded-full"></span>
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                        <h4 className="font-semibold text-lg">Late Delivery</h4>
                        <span className="text-sm text-text-muted">Aug 05, 2023</span>
                     </div>
                     <p className="text-text-muted text-sm">Delayed by 4 hours due to weather conditions. Logged as non-fault.</p>
                  </div>
                </div>
             </CardContent>
           </Card>

           {/* Documents */}
           <Card>
             <CardHeader>
               <CardTitle>Compliance Documents</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                 <div className="flex items-center gap-3">
                   <FileText className="h-5 w-5 text-blue-500" />
                   <div>
                     <p className="font-medium text-sm">Medical Examiner's Certificate</p>
                     <p className="text-xs text-text-muted">Expires: Dec 2024</p>
                   </div>
                 </div>
                 <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
               </div>
               <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                 <div className="flex items-center gap-3">
                   <FileText className="h-5 w-5 text-blue-500" />
                   <div>
                     <p className="font-medium text-sm">Background Check Report</p>
                     <p className="text-xs text-text-muted">Cleared: Mar 2023</p>
                   </div>
                 </div>
                 <Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
