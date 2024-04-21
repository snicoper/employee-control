import { DateTime } from 'luxon';
import { CalendarClassColor } from './calendar-class-color';

export interface CalendarEvent {
  id?: string;
  date: DateTime;
  description: string;
  cssClass: CalendarClassColor;
  selectable: boolean;
}
