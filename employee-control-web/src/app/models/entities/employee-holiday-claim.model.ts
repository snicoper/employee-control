import { EmployeeHolidayClaimLine } from './employee-holiday-claim-line.model';
import { User } from './user.model';

export interface EmployeeHolidayClaim {
  id: string;
  year: number;
  description?: string;
  accepted: boolean;
  userId: string;
  user: User;
  employeeHolidayClaimLines: Array<EmployeeHolidayClaimLine>;
}
