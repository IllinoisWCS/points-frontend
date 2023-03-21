import { Event } from './event';

export interface Profile {
  name: string;
  events: Event[];
  points: number;
  role: string;
  netId : string;
  num_events: number;
}
