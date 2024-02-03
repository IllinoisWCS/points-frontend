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
      const res = await axiosInstance.get('/profile');
      return res.data;
    }
  );

  return {
    data,
    isError,
    error
  };
};
