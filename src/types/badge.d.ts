declare global {
  interface Badge {
    _id: string;
    name: string;
    description: string;
    tier?: 1 | 2 | 3;
    shape: 'circle' | 'diamond' | 'hexagon' | 'shield';
    image: string;
    isTiered: boolean;
    category?:
      | 'n_corporate_events'
      | 'n_explorations_events'
      | 'n_mentoring_events'
      | 'n_social_events';
    count?: number;
  }
}

export {};
