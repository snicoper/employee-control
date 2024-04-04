import { DateTime } from 'luxon';

export interface CalendarDay {
  companyHolidayId?: string;
  day: number;
  date?: DateTime;
  inactive: boolean;
  isToday: boolean;
  description?: string;
  background?: string;
  color?: string;
  canAddEvent: boolean;
}
