import axiosInstance from './api';

export interface CheckpointRedemption {
  userId: string;
  checkpointValue: number;
}

export interface CheckpointResponse {
  success: boolean;
  num_checkpoints: number;
  timestamps: Date[];
}

export const redeemCheckpoint = async (
  userId: string,
  checkpointValue: number
): Promise<CheckpointResponse> => {
  const response = await axiosInstance.post<CheckpointResponse>(
    '/checkpoints/redeem',
    {
      userId,
      checkpointValue
    }
  );
  return response.data;
};
