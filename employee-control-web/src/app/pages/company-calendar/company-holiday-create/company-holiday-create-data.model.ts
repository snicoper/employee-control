import { CalendarEvent } from '../../../components/year-calendar-view/calendar-event.model';

export interface CompanyHolidayCreateData {
  calendarEvent: CalendarEvent;
  companyCalendarId: string;
}
