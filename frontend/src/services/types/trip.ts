export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string;
  distance: number;
  cargo: string;
  weight: number;
  notes?: string;
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

export interface GetTripsParams {
  page?: number;
  limit?: number;
  status?: string;
  driverId?: string;
  vehicleId?: string;
  search?: string;
}
