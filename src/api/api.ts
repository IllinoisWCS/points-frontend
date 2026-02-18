import axios from 'axios';
import { Profile } from '../types/profile';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000',
  withCredentials: true
});

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

export default axiosInstance;
