import * as React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../shared/contexts/AuthContext"
import { getDefaultRoute } from "../../shared/config/roles/defaultRoutes"

// Layouts
import { AuthLayout } from "../layouts/AuthLayout"
import { FleetLayout } from "../layouts/FleetLayout"
import { DispatcherLayout } from "../layouts/DispatcherLayout"
import { SafetyLayout } from "../layouts/SafetyLayout"
import { FinanceLayout } from "../layouts/FinanceLayout"

// Auth Pages
import { Login } from "../../features/auth/pages/Login"
import { Register } from "../../features/auth/pages/Register"
import { ForgotPassword } from "../../features/auth/pages/ForgotPassword"
import { ResetPassword } from "../../features/auth/pages/ResetPassword"

// Fleet Pages
import { FleetDashboard } from "../../features/fleet/pages/FleetDashboard"
import { VehicleRegistry } from "../../features/fleet/pages/VehicleRegistry"
import { VehicleDetails } from "../../features/fleet/pages/VehicleDetails"
import { VehicleDocuments } from "../../features/fleet/pages/VehicleDocuments"
import { MaintenanceCenter } from "../../features/fleet/pages/MaintenanceCenter"
import { FleetAnalytics } from "../../features/fleet/pages/FleetAnalytics"
import { FleetReports } from "../../features/fleet/pages/FleetReports"
import { MaintenanceCalendar } from "../../features/fleet/pages/MaintenanceCalendar"

// Dispatch Pages
import { DispatcherDashboard } from "../../features/dispatch/pages/DispatcherDashboard"
import { DispatchQueue } from "../../features/dispatch/pages/DispatchQueue"
import { TripManagement } from "../../features/dispatch/pages/TripManagement"
import { CreateTripWizard } from "../../features/dispatch/pages/CreateTripWizard"
import { TripDetails } from "../../features/dispatch/pages/TripDetails"
import { RoutePlanner } from "../../features/dispatch/pages/RoutePlanner"
import { TripAnalytics } from "../../features/dispatch/pages/TripAnalytics"
import { TripHistory } from "../../features/dispatch/pages/TripHistory"

// Safety Pages
import { SafetyDashboard } from "../../features/safety/pages/SafetyDashboard"
import { DriverDirectory } from "../../features/safety/pages/DriverDirectory"
import { LicenseMonitoring } from "../../features/safety/pages/LicenseMonitoring"
import { ComplianceCenter } from "../../features/safety/pages/ComplianceCenter"
import { IncidentCenter } from "../../features/safety/pages/IncidentCenter"
import { SafetyAnalytics } from "../../features/safety/pages/SafetyAnalytics"
import { SafetyReports } from "../../features/safety/pages/SafetyReports"
import { DriverProfile } from "../../features/safety/pages/DriverProfile"

// Finance Pages
import { FinanceDashboard } from "../../features/finance/pages/FinanceDashboard"
import { ExpenseManagement } from "../../features/finance/pages/ExpenseManagement"
import { FuelLogs } from "../../features/finance/pages/FuelLogs"
import { OperationalCost } from "../../features/finance/pages/OperationalCost"
import { VehicleROI } from "../../features/finance/pages/VehicleROI"
import { FinancialAnalytics } from "../../features/finance/pages/FinancialAnalytics"
import { FinanceReports } from "../../features/finance/pages/FinanceReports"
import { ExportCenter } from "../../features/finance/pages/ExportCenter"

// Shared Enterprise Pages
import { NotificationCenter } from "../../features/shared/pages/NotificationCenter"
import { GlobalSearch } from "../../features/shared/pages/GlobalSearch"
import { DocumentCenter } from "../../features/shared/pages/DocumentCenter"
import { ActivityCenter } from "../../features/shared/pages/ActivityCenter"
import { Calendar } from "../../features/shared/pages/Calendar"
import { Profile } from "../../features/shared/pages/Profile"
import { Settings } from "../../features/shared/pages/Settings"
import { HelpCenter } from "../../features/shared/pages/HelpCenter"
import { AuditLogs } from "../../features/shared/pages/AuditLogs"
import { ImportExportCenter } from "../../features/shared/pages/ImportExportCenter"
import { RoleManagement } from "../../features/shared/pages/RoleManagement"
import { AIInsights } from "../../features/shared/pages/AIInsights"
import { DashboardWidgetManager } from "../../features/shared/pages/DashboardWidgetManager"

// Placeholder component for workspaces
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col h-full rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center animate-in fade-in zoom-in-95 duration-500 items-center justify-center dark:border-gray-800 dark:bg-gray-900/50">
    <h2 className="text-2xl font-semibold text-text-primary mb-2">{title} Workspace</h2>
    <p className="text-text-muted max-w-md">
      This view is currently under construction according to the UX Blueprint specification.
    </p>
  </div>
)

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) return null
  
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }
  
  if (user.role !== allowedRole) {
    return <Navigate to={getDefaultRoute(user.role)} replace />
  }
  
  return <>{children}</>
}

// Render shared routes so we don't duplicate them in the JSX block
const renderSharedRoutes = () => (
  <>
    <Route path="notifications" element={<NotificationCenter />} />
    <Route path="search" element={<GlobalSearch />} />
    <Route path="documents" element={<DocumentCenter />} />
    <Route path="activity" element={<ActivityCenter />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="help" element={<HelpCenter />} />
    <Route path="audit-logs" element={<AuditLogs />} />
    <Route path="import-export" element={<ImportExportCenter />} />
    <Route path="roles" element={<RoleManagement />} />
    <Route path="insights" element={<AIInsights />} />
    <Route path="dashboard-manager" element={<DashboardWidgetManager />} />
  </>
)

export function AppRoutes() {
  const { user, isLoading } = useAuth()
  
  if (isLoading) return null
  
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={
        <Navigate to={getDefaultRoute(user?.role)} replace />
      } />

      {/* Auth Routes */}
      <Route path="/auth" element={!user ? <AuthLayout /> : <Navigate to="/" replace />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Fleet Workspace */}
      <Route path="/fleet" element={
        <ProtectedRoute allowedRole="fleet_manager">
          <FleetLayout />
        </ProtectedRoute>
      }>
        <Route index element={<FleetDashboard />} />
        <Route path="registry" element={<VehicleRegistry />} />
        <Route path="registry/:id" element={<VehicleDetails />} />
        <Route path="documents" element={<VehicleDocuments />} />
        <Route path="maintenance" element={<MaintenanceCenter />} />
        <Route path="maintenance/calendar" element={<MaintenanceCalendar />} />
        <Route path="analytics" element={<FleetAnalytics />} />
        <Route path="reports" element={<FleetReports />} />
        {renderSharedRoutes()}
        <Route path="*" element={<Placeholder title="Fleet Module" />} />
      </Route>

      {/* Dispatch Workspace */}
      <Route path="/dispatch" element={
        <ProtectedRoute allowedRole="dispatcher">
          <DispatcherLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DispatcherDashboard />} />
        <Route path="board" element={<DispatchQueue />} />
        <Route path="trips" element={<TripManagement />} />
        <Route path="trips/new" element={<CreateTripWizard />} />
        <Route path="trips/:id" element={<TripDetails />} />
        <Route path="map" element={<RoutePlanner />} />
        <Route path="analytics" element={<TripAnalytics />} />
        <Route path="history" element={<TripHistory />} />
        {renderSharedRoutes()}
        <Route path="*" element={<Placeholder title="Dispatch Module" />} />
      </Route>

      {/* Safety Workspace */}
      <Route path="/safety" element={
        <ProtectedRoute allowedRole="safety_officer">
          <SafetyLayout />
        </ProtectedRoute>
      }>
        <Route index element={<SafetyDashboard />} />
        <Route path="drivers" element={<DriverDirectory />} />
        <Route path="drivers/:id" element={<DriverProfile />} />
        <Route path="licenses" element={<LicenseMonitoring />} />
        <Route path="compliance" element={<ComplianceCenter />} />
        <Route path="incidents" element={<IncidentCenter />} />
        <Route path="analytics" element={<SafetyAnalytics />} />
        <Route path="reports" element={<SafetyReports />} />
        {renderSharedRoutes()}
        <Route path="*" element={<Placeholder title="Safety Module" />} />
      </Route>

      {/* Finance Workspace */}
      <Route path="/finance" element={
        <ProtectedRoute allowedRole="financial_analyst">
          <FinanceLayout />
        </ProtectedRoute>
      }>
        <Route index element={<FinanceDashboard />} />
        <Route path="expenses" element={<ExpenseManagement />} />
        <Route path="fuel" element={<FuelLogs />} />
        <Route path="costs" element={<OperationalCost />} />
        <Route path="roi" element={<VehicleROI />} />
        <Route path="analytics" element={<FinancialAnalytics />} />
        <Route path="reports" element={<FinanceReports />} />
        <Route path="export" element={<ExportCenter />} />
        {renderSharedRoutes()}
        <Route path="*" element={<Placeholder title="Finance Module" />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
