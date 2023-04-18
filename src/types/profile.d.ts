import { Event } from './event';

export interface Profile {
  name: string;
  events: Event[];
  points: number;
  role: string;
  netId : string;
  num_events: number;
}

export type ProfileType = {
  events: Event[];
  points: number;
  name: string;
  role: string;
  netId : string;
  num_events: number; 
}
