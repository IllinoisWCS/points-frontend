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
      const res = await axiosInstance.get('/events');
      return res.data;
    }
  );

  return {
    data,
    isLoading,
    isError,
    error
  };
};
