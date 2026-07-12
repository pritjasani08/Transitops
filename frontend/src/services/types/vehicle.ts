export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: 'active' | 'maintenance' | 'out_of_service' | 'sold';
  currentMileage: number;
  fuelType: 'diesel' | 'gasoline' | 'electric' | 'hybrid';
  assignedDriverId?: string;
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

export interface GetVehiclesParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
