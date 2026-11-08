import { EventCategoryType } from './event';

/**
 * response from the backend draft of the WrappedStats shape in points-api
 * **/

export interface WrappedStats {
  /** school year */
  period: {
    label: string; // "2025–2026"
    startDate: string; // "2025-08-25"
    endDate: string; // "2026-05-15"
  };

    /** first name */
  displayName: string;

    /** total events in the period */
  totalEvents: number;

  /** total event lengths rounded to 1 decimal. */
  totalHours: number;

  /** total points from those events */
  totalPoints: number;

  /** countsof eventsfor the user by type (0 if they attended none) */
  eventCountsByType: Record<EventCategoryType, number>;

  /** most attend type - if they have a tie of events, then alphabetical order decides the most
   * attended type. 
   * else: null*/
  mostAttendedType: {
    type: EventCategoryType;
    count: number;
  } | null;

  /**
   * month is "YYYY-MM" (America/Chicago);
   * earlier month wins if tie
   * else: null
   */
  busiestMonth: {
    month: string;
    count: number;
  } | null;

  /**
   * badges (if the user earned) to feature
   * may not have been earned in the period as badges should be lifetime.
   */
  featuredBadge: {
    name: string;
    description: string;
    image: string; // e.g. "mentoring_guide.png" — see utils/badgeImageMap.ts
    shape: Badge['shape'];
    tier: 1 | 2 | 3 | null; // null for non-tiered badges
  } | null;

  /** total badges the user earned (lifetime). */
  badgesEarned: number;
}