import axiosInstance from './api';
import { Profile } from '../types/profile';

export interface CheckpointRedemption {
  userId: string;
}

export interface CheckpointResponse {
  success: boolean;
  n_checkpoints: number;
  timestamps: Date[];
}

export const redeemCheckpoint = async (
  userId: string
): Promise<CheckpointResponse> => {
  const response = await axiosInstance.post<CheckpointResponse>(
    '/checkpoints/redeem',
    {
      userId
    }
  );
  return response.data;
};

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

export const isOfficer = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<Profile>('/profile');
    return response.data?.role === 'officer';
  } catch (err: any) {
    if (
      err?.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      return false;
    }
    throw err;
  }
};
