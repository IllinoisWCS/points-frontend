import { useQuery } from 'react-query';
import axiosInstance from '../../api';
import { Event } from '../../types/event';

export const useEventQuery = (): {
  data: Event[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { isLoading, isError, error, data } = useQuery<Event[], Error>(
    ['get-events'],
    async () => {
      try {
        const res = await axiosInstance.get('/events');
        return res.data;
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          return [];
        }
        throw err;
      }
    },
    {
      retry: (failureCount, error: any) => {
        if (
          error.response &&
          (error.reponse.status === 401 || error.response.status === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      }
    }
  );

  return {
    data,
    isLoading,
    isError,
    error
  };
};
