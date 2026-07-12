import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fuelService } from '../api/fuel';
import { GetFuelLogsParams, FuelLog } from '../types/fuel';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const fuelKeys = {
  all: ['fuel'] as const,
  lists: () => [...fuelKeys.all, 'list'] as const,
  list: (filters: GetFuelLogsParams) => [...fuelKeys.lists(), filters] as const,
  details: () => [...fuelKeys.all, 'detail'] as const,
  detail: (id: string) => [...fuelKeys.details(), id] as const,
};

export const useFuelLogs = (params: GetFuelLogsParams = {}) => {
  return useQuery({
    queryKey: fuelKeys.list(params),
    queryFn: () => fuelService.getFuelLogs(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useFuelLog = (id: string) => {
  return useQuery({
    queryKey: fuelKeys.detail(id),
    queryFn: () => fuelService.getFuelLogById(id),
    enabled: !!id,
  });
};

export const useCreateFuelLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fuelService.createFuelLog,
    onSuccess: () => {
      toast.success('Fuel log created successfully');
      queryClient.invalidateQueries({ queryKey: fuelKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create fuel log'),
  });
};

export const useUpdateFuelLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FuelLog> }) => 
      fuelService.updateFuelLog(id, data),
    onMutate: async (newLog) => {
      await queryClient.cancelQueries({ queryKey: fuelKeys.detail(newLog.id) });
      const previousLog = queryClient.getQueryData<FuelLog>(fuelKeys.detail(newLog.id));
      
      if (previousLog) {
        queryClient.setQueryData<FuelLog>(fuelKeys.detail(newLog.id), {
          ...previousLog,
          ...newLog.data,
        });
      }
      return { previousLog };
    },
    onSuccess: (data) => {
      toast.success('Fuel log updated successfully');
      queryClient.invalidateQueries({ queryKey: fuelKeys.lists() });
      queryClient.invalidateQueries({ queryKey: fuelKeys.detail(data.id) });
    },
    onError: (error, newLog, context) => {
      handleApiError(error, 'Failed to update fuel log');
      if (context?.previousLog) {
        queryClient.setQueryData(fuelKeys.detail(newLog.id), context.previousLog);
      }
    },
  });
};

export const useDeleteFuelLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fuelService.deleteFuelLog,
    onSuccess: () => {
      toast.success('Fuel log deleted successfully');
      queryClient.invalidateQueries({ queryKey: fuelKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete fuel log'),
  });
};
