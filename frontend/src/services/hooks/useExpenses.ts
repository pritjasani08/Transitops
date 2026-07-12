import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from '../api/expenses';
import { GetExpensesParams, Expense } from '../types/expense';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const expenseKeys = {
  all: ['expenses'] as const,
  lists: () => [...expenseKeys.all, 'list'] as const,
  list: (filters: GetExpensesParams) => [...expenseKeys.lists(), filters] as const,
  details: () => [...expenseKeys.all, 'detail'] as const,
  detail: (id: string) => [...expenseKeys.details(), id] as const,
};

export const useExpenses = (params: GetExpensesParams = {}) => {
  return useQuery({
    queryKey: expenseKeys.list(params),
    queryFn: () => expenseService.getExpenses(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useExpense = (id: string) => {
  return useQuery({
    queryKey: expenseKeys.detail(id),
    queryFn: () => expenseService.getExpenseById(id),
    enabled: !!id,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseService.createExpense,
    onSuccess: () => {
      toast.success('Expense created successfully');
      queryClient.invalidateQueries({ queryKey: expenseKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create expense'),
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) => 
      expenseService.updateExpense(id, data),
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: expenseKeys.detail(newExpense.id) });
      const previousExpense = queryClient.getQueryData<Expense>(expenseKeys.detail(newExpense.id));
      
      if (previousExpense) {
        queryClient.setQueryData<Expense>(expenseKeys.detail(newExpense.id), {
          ...previousExpense,
          ...newExpense.data,
        });
      }
      return { previousExpense };
    },
    onSuccess: (data) => {
      toast.success('Expense updated successfully');
      queryClient.invalidateQueries({ queryKey: expenseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseKeys.detail(data.id) });
    },
    onError: (error, newExpense, context) => {
      handleApiError(error, 'Failed to update expense');
      if (context?.previousExpense) {
        queryClient.setQueryData(expenseKeys.detail(newExpense.id), context.previousExpense);
      }
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseService.deleteExpense,
    onSuccess: () => {
      toast.success('Expense deleted successfully');
      queryClient.invalidateQueries({ queryKey: expenseKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete expense'),
  });
};
