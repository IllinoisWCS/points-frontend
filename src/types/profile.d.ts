import { Event } from './event';

export interface Profile {
  name: string;
  netId: string;
  events: Event[];
  points: number;
  role: string;
  n_checkpoints?: number;
}
