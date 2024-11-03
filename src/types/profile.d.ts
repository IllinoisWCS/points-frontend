import { Event } from './event';

export interface Profile {
  name: string;
  events: Event[];
  points: number;
  role: string;
}
