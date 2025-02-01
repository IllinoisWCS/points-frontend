import { useQuery } from 'react-query';
import axiosInstance from '../../api';
import { Profile } from '../../types/profile';

export const useProfileQuery = (): {
  data: Profile | undefined;
  isError: boolean;
  error: Error | null;
} => {
  const { isError, error, data } = useQuery<Profile, Error>(
    ['get-profile'],
    async () => {
      try {
        const res = await axiosInstance.get('/profile');
        return res.data;
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          return null;
        }
        throw err;
      }
    },
    {
      retry: (failureCount, error: any) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      }
    }
  );

  return {
    data,
    isError,
    error
  };
};
