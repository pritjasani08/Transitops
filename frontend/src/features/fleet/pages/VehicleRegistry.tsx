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
  ArrowUpDown,
  X
} from "lucide-react"

import { Vehicle } from "../types"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Badge } from "../../../shared/components/ui/badge"
import { Card } from "../../../shared/components/ui/card"
import { cn } from "../../../shared/utils/cn"
import { axiosInstance } from "../../../services/api/axios"
import toast from "react-hot-toast"

const columnHelper = createColumnHelper<Vehicle>()

const columns = [
  columnHelper.accessor('registration_number', {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4 h-8 px-4 font-semibold">
          Registration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: info => <span className="font-mono font-medium">{info.getValue() || '-'}</span>,
  }),
  columnHelper.accessor(row => `${row.make} ${row.model}`, {
    id: 'makeModel',
    header: 'Make & Model',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const val = info.getValue() || 'Available'
      return (
        <Badge variant={
          val === 'Available' ? 'success' : 
          val === 'On Trip' ? 'default' : 
          val === 'Maintenance' ? 'danger' : 'secondary'
        }>
          {val}
        </Badge>
      )
    }
  }),
  columnHelper.accessor('odometer', {
    header: 'Odometer',
    cell: info => <span className="font-mono text-sm">{(info.getValue() || 0).toLocaleString()} km</span>,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
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
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

  // Form states
  const [formData, setFormData] = React.useState({
    registration_number: '', make: '', model: '', year: new Date().getFullYear(), type: 'Heavy Truck', maximum_load_capacity: 5000, fuel_type: 'Diesel'
  })

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/vehicles')
      setVehicles(res.data.data)
    } catch (err) {
      toast.error('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchVehicles()
  }, [])

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/vehicles', formData)
      toast.success('Vehicle added successfully')
      setIsAddModalOpen(false)
      fetchVehicles()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add vehicle')
    }
  }

  const table = useReactTable({
    data: vehicles,
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
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
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
              {loading ? (
                <tr><td colSpan={columns.length} className="px-6 py-12 text-center text-text-muted">Loading vehicles...</td></tr>
              ) : table.getRowModel().rows.map(row => (
                <motion.tr 
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
              {!loading && table.getRowModel().rows.length === 0 && (
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
            Showing <span className="font-medium text-text-primary">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + (table.getFilteredRowModel().rows.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-text-primary">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span> of <span className="font-medium text-text-primary">{table.getFilteredRowModel().rows.length}</span> results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
          </div>
        </div>
      </Card>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-bg-base rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Registration No.</label>
                  <Input required value={formData.registration_number} onChange={e => setFormData({...formData, registration_number: e.target.value})} placeholder="MH-12-AB-1234" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Vehicle Type</label>
                  <Input required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="Heavy Truck" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Make</label>
                  <Input required value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} placeholder="Volvo" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Model</label>
                  <Input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="FH16" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Year</label>
                  <Input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Max Capacity (kg)</label>
                  <Input required type="number" value={formData.maximum_load_capacity} onChange={e => setFormData({...formData, maximum_load_capacity: parseFloat(e.target.value)})} />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">Save Vehicle</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
