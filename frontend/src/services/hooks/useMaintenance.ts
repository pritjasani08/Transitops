import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceService } from '../api/maintenance';
import { GetMaintenanceParams, MaintenanceRecord } from '../types/maintenance';
import { handleApiError } from '../utils/error';
import { toast } from 'sonner';

export const maintenanceKeys = {
  all: ['maintenance'] as const,
  lists: () => [...maintenanceKeys.all, 'list'] as const,
  list: (filters: GetMaintenanceParams) => [...maintenanceKeys.lists(), filters] as const,
  details: () => [...maintenanceKeys.all, 'detail'] as const,
  detail: (id: string) => [...maintenanceKeys.details(), id] as const,
};

export const useMaintenanceRecords = (params: GetMaintenanceParams = {}) => {
  return useQuery({
    queryKey: maintenanceKeys.list(params),
    queryFn: () => maintenanceService.getMaintenanceRecords(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useMaintenanceRecord = (id: string) => {
  return useQuery({
    queryKey: maintenanceKeys.detail(id),
    queryFn: () => maintenanceService.getMaintenanceById(id),
    enabled: !!id,
  });
};

export const useCreateMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: maintenanceService.createMaintenance,
    onSuccess: () => {
      toast.success('Maintenance record created successfully');
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to create maintenance record'),
  });
};

export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MaintenanceRecord> }) => 
      maintenanceService.updateMaintenance(id, data),
    onMutate: async (newRecord) => {
      await queryClient.cancelQueries({ queryKey: maintenanceKeys.detail(newRecord.id) });
      const previousRecord = queryClient.getQueryData<MaintenanceRecord>(maintenanceKeys.detail(newRecord.id));
      
      if (previousRecord) {
        queryClient.setQueryData<MaintenanceRecord>(maintenanceKeys.detail(newRecord.id), {
          ...previousRecord,
          ...newRecord.data,
        });
      }
      return { previousRecord };
    },
    onSuccess: (data) => {
      toast.success('Maintenance record updated successfully');
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.detail(data.id) });
    },
    onError: (error, newRecord, context) => {
      handleApiError(error, 'Failed to update maintenance record');
      if (context?.previousRecord) {
        queryClient.setQueryData(maintenanceKeys.detail(newRecord.id), context.previousRecord);
      }
    },
  });
};

export const useDeleteMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: maintenanceService.deleteMaintenance,
    onSuccess: () => {
      toast.success('Maintenance record deleted successfully');
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
    },
    onError: (error) => handleApiError(error, 'Failed to delete maintenance record'),
  });
};
