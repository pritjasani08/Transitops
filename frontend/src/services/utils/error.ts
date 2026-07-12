import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleApiError = (error: unknown, defaultMessage = 'An unexpected error occurred') => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;
    
    // Check if error message is provided by the API
    const message = data?.message || data?.error || error.message || defaultMessage;
    
    switch (status) {
      case 400:
        toast.error(`Bad Request: ${message}`);
        break;
      case 401:
        // Handled globally in some cases, but good to show if it reaches here
        toast.error('Session expired. Please log in again.');
        break;
      case 403:
        toast.error('Forbidden: You do not have permission to perform this action.');
        break;
      case 404:
        toast.error(`Not Found: ${message}`);
        break;
      case 422:
        toast.error(`Validation Error: ${message}`);
        break;
      case 500:
        toast.error('Server Error: Something went wrong on our end.');
        break;
      default:
        toast.error(message);
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(defaultMessage);
  }
};
