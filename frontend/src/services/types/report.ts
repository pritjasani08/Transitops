export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'operational' | 'safety' | 'maintenance';
  format: 'pdf' | 'csv' | 'excel';
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
  generatedBy: string;
  dateRange: {
    start: string;
    end: string;
  };
  createdAt: string;
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

export interface GetReportsParams {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
}
