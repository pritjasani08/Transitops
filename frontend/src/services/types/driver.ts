export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  status: 'active' | 'inactive' | 'on_leave';
  assignedVehicleId?: string;
  rating: number;
  totalMiles: number;
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

export interface GetDriversParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
