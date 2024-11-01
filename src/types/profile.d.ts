import { Event } from './event';

export interface Profile {
  events: Event[];
  points: number;
  role: string;
  name: string;
}
