export interface Expense {
  id: string;
  tripId?: string;
  vehicleId?: string;
  driverId?: string;
  category: 'tolls' | 'meals' | 'lodging' | 'maintenance' | 'other';
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
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

export interface GetExpensesParams {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  driverId?: string;
}
