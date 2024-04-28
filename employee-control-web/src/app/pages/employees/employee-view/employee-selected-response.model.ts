import { TimeProvider } from '../../../core/types/time-provider.type';

export interface EmployeeSelectedResponse {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  phoneNumber?: string;
  email: string;
  entryDate?: TimeProvider;
  emailConfirmed: boolean;
  companyCalendarId: string;
  companyCalendarName: string;
}
