import { Event } from './event';

export interface Profile {
  events: Event[];
  points: number;
  name: string;
  role: string;
  netId: string;
  num_events: number;
}
