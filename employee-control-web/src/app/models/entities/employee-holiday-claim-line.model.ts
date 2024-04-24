import { EmployeeHolidayClaim } from './employee-holiday-claim.model';
import { User } from './user.model';

export interface EmployeeHolidayClaimLine {
  id: string;
  date: Date;
  userId: string;
  user: User;
  employeeHolidayClaim: EmployeeHolidayClaim;
}
