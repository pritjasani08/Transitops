export interface FuelLog {
  id: string;
  vehicleId: string;
  driverId: string;
  gallons: number;
  cost: number;
  pricePerGallon: number;
  odometer: number;
  location: string;
  date: string;
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

export interface GetFuelLogsParams {
  page?: number;
  limit?: number;
  vehicleId?: string;
  driverId?: string;
}
