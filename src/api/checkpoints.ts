import axiosInstance from './api';
import { Profile } from '../types/profile';

export const getCheckpointCount = async (): Promise<number | null> => {
  try {
    const response = await axiosInstance.get<Profile>('/profile');
    return response.data?.n_checkpoints ?? null;
  } catch (err: any) {
    if (
      err?.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      return null;
    }
    throw err;
  }
};
