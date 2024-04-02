export interface CalendarDay {
  day: number;
  date?: Date;
  inactive: boolean;
  isToday: boolean;
  description?: string;
  background?: string;
  color?: string;
  editable: boolean;
  removable: boolean;
  canAddEvent: boolean;
}
