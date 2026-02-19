import axiosInstance from './api';

export interface CheckpointRedemption {
  userId: string;
  checkpointValue: number;
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
