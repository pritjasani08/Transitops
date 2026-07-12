import * as React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState
} from "@tanstack/react-table"
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  ArrowUpDown
} from "lucide-react"

import { Vehicle } from "../types"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Badge } from "../../../shared/components/ui/badge"
import { Card } from "../../../shared/components/ui/card"
import { cn } from "../../../shared/utils/cn"

// Mock Data
const mockVehicles: Vehicle[] = [
  { id: "1", registration: "MH-12-AB-1234", make: "Volvo", model: "FH16", year: 2022, type: "Heavy Truck", status: "Available", odometer: 45000, healthScore: 92, lastService: "2023-10-15", nextService: "2024-04-15" },
  { id: "2", registration: "NY-05-XY-9876", make: "Freightliner", model: "Cascadia", year: 2021, type: "Heavy Truck", status: "On Trip", odometer: 120000, healthScore: 85, lastService: "2023-08-20", nextService: "2024-02-20" },
  { id: "3", registration: "CA-01-ZZ-5555", make: "Peterbilt", model: "579", year: 2023, type: "Heavy Truck", status: "In Shop", odometer: 15000, healthScore: 45, lastService: "2024-01-10", nextService: "2024-01-25" },
  { id: "4", registration: "TX-99-BB-4444", make: "Kenworth", model: "T680", year: 2020, type: "Heavy Truck", status: "Available", odometer: 210000, healthScore: 78, lastService: "2023-11-05", nextService: "2024-05-05" },
  { id: "5", registration: "FL-22-CC-3333", make: "Mack", model: "Anthem", year: 2022, type: "Heavy Truck", status: "On Trip", odometer: 65000, healthScore: 88, lastService: "2023-09-12", nextService: "2024-03-12" },
]

const columnHelper = createColumnHelper<Vehicle>()

const columns = [
  columnHelper.accessor('registration', {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4 h-8 px-4 font-semibold">
          Registration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: info => <span className="font-mono font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor(row => `${row.make} ${row.model}`, {
    id: 'makeModel',
    header: 'Make & Model',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const val = info.getValue()
      return (
        <Badge variant={
          val === 'Available' ? 'success' : 
          val === 'On Trip' ? 'default' : 
          val === 'In Shop' ? 'danger' : 'secondary'
        }>
          {val}
        </Badge>
      )
    }
  }),
  columnHelper.accessor('healthScore', {
    header: 'Health Score',
    cell: info => {
      const score = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div 
              className={cn("h-full rounded-full", score >= 80 ? "bg-secondary-500" : score >= 50 ? "bg-warning-500" : "bg-danger-500")}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="font-mono text-sm">{score}</span>
        </div>
      )
    }
  }),
  columnHelper.accessor('odometer', {
    header: 'Odometer',
    cell: info => <span className="font-mono text-sm">{info.getValue().toLocaleString()} km</span>,
  }),
  columnHelper.accessor('nextService', {
    header: 'Next Service',
    cell: info => <span className="text-text-muted">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
        <MoreVertical className="h-4 w-4" />
      </Button>
    ),
  })
]

export function VehicleRegistry() {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useReactTable({
    data: mockVehicles,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Vehicle Registry</h1>
          <p className="text-text-muted mt-1">Manage and track all fleet assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input 
            placeholder="Search by registration, make, model..." 
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 font-medium whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/fleet/registry/${row.original.id}`)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-text-muted">
                    No vehicles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30">
          <div className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-primary">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-medium text-text-primary">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span> of <span className="font-medium text-text-primary">{table.getFilteredRowModel().rows.length}</span> results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
