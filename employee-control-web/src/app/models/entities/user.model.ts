import { Company } from './company.model';
import { EmployeeHoliday } from './employee-holiday.model';
import { EmployeeSettings } from './employee-settings.model';
import { TimeControl } from './time-control.model';
import { UserRole } from './user-role.model';

export interface User {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  active: boolean;
  phoneNumber?: string;
  email: string;
  entryDate?: Date;
  emailConfirmed: boolean;
  employeeSettings: EmployeeSettings;
  employeeHoliday: EmployeeHoliday;
  timeControls: Array<TimeControl>;
  company?: Company;
  userRoles: Array<UserRole>;
}
