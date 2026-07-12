import { axiosInstance } from '../api/axios';
import { Expense, PaginatedResponse, GetExpensesParams } from '../types/expense';

export const expenseService = {
  getExpenses: async (params?: GetExpensesParams): Promise<PaginatedResponse<Expense>> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockExpenseResponse), 500);
      });
    }
    const response = await axiosInstance.get('/expenses', { params });
    return response.data;
  },

  getExpenseById: async (id: string): Promise<Expense> => {
    if (import.meta.env.DEV) {
      return new Promise((resolve, reject) => {
        const expense = mockExpenses.find(e => e.id === id);
        if (expense) setTimeout(() => resolve(expense), 500);
        else setTimeout(() => reject(new Error('Expense not found')), 500);
      });
    }
    const response = await axiosInstance.get(`/expenses/${id}`);
    return response.data;
  },

  createExpense: async (data: Partial<Expense>): Promise<Expense> => {
    const response = await axiosInstance.post('/expenses', data);
    return response.data;
  },

  updateExpense: async (id: string, data: Partial<Expense>): Promise<Expense> => {
    const response = await axiosInstance.patch(`/expenses/${id}`, data);
    return response.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/expenses/${id}`);
  }
};

const mockExpenses: Expense[] = [
  {
    id: 'e1',
    tripId: 't1',
    driverId: 'd1',
    category: 'tolls',
    amount: 45.50,
    date: new Date().toISOString(),
    description: 'I-90 Toll',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'e2',
    tripId: 't1',
    driverId: 'd1',
    category: 'lodging',
    amount: 120.00,
    date: new Date(Date.now() - 86400000).toISOString(),
    description: 'Motel 6',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockExpenseResponse: PaginatedResponse<Expense> = {
  data: mockExpenses,
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};
