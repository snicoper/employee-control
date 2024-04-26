import { TimeProvider } from '../../core/types/time-provider.type';
import { CompanyCalendar } from './company-calendar.model';

export interface CompanyCalendarHoliday {
  id: string;
  date: TimeProvider;
  description: string;
  companyCalendarId: string;
  companyCalendar: CompanyCalendar;
}
