import { CompanyCalendarHoliday } from './company-calendar-holiday.model';
import { User } from './user.model';

export interface CompanyCalendar {
  id: string;
  name: string;
  description: string;
  default: boolean;
  users: Array<User>;
  companyCalendarHolidays: Array<CompanyCalendarHoliday>;
}
