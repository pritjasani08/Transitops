export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'preventive' | 'repair' | 'inspection';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  cost: number;
  scheduledDate: string;
  completedDate?: string;
  technicianNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetMaintenanceParams {
  page?: number;
  limit?: number;
  vehicleId?: string;
  status?: string;
  type?: string;
}
