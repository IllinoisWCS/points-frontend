import { Profile } from '../../types/profile';

export interface PointsProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: Profile | undefined;
}
