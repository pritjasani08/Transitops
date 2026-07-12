import { axiosInstance } from '../api/axios';
import { Vehicle, PaginatedResponse, GetVehiclesParams } from '../types/vehicle';

export const vehicleService = {
  getVehicles: async (params?: GetVehiclesParams): Promise<PaginatedResponse<Vehicle>> => {
    // For mock development, simulate API response
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVehiclesResponse), 500);
      });
    }
    const response = await axiosInstance.get('/vehicles', { params });
    return response.data;
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const vehicle = mockVehicles.find(v => v.id === id);
        if (vehicle) setTimeout(() => resolve(vehicle), 500);
        else setTimeout(() => reject(new Error('Vehicle not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/vehicles/${id}`);
    return response.data;
  },

  createVehicle: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await axiosInstance.post('/vehicles', data);
    return response.data;
  },

  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await axiosInstance.patch(`/vehicles/${id}`, data);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/vehicles/${id}`);
  }
};

const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Volvo',
    model: 'VNL 860',
    year: 2023,
    licensePlate: 'ABC-1234',
    vin: '1ZVBP70XX51234567',
    status: 'active',
    currentMileage: 45000,
    fuelType: 'diesel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'v2',
    make: 'Freightliner',
    model: 'Cascadia',
    year: 2022,
    licensePlate: 'XYZ-9876',
    vin: '2FVBP70XX51234567',
    status: 'maintenance',
    currentMileage: 120000,
    fuelType: 'diesel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockVehiclesResponse: PaginatedResponse<Vehicle> = {
  data: mockVehicles,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
