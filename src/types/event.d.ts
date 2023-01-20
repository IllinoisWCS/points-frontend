export interface Event {
  _id: string;
  key: string;
  name: string;
  category: 'corporate' | 'social' | 'outreach' | 'mentoring' | 'explorations' | 'generalMeeting' | 'other'; // TODO
  points: number;
  start: Date;
  end: Date;
  private: boolean;
}
