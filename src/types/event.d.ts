export type EventCategoryType = 'corporate' | 'social' | 'outreach' | 'mentoring' | 'explorations' | 'generalMeeting' | 'other';

export interface NewEvent {
  name: string;
  category: EventCategoryType;
  points: number;
  start: Date;
  end: Date;
  private: boolean;
}

export interface Event {
  _id: string;
  key: string;
  name: string;
  category: EventCategoryType;
  points: number;
  start: Date;
  end: Date;
  private: boolean;
}
