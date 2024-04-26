import { TimeProvider } from '../../core/types/time-provider.type';
import { EmployeeHolidayClaim } from './employee-holiday-claim.model';
import { User } from './user.model';

export interface EmployeeHolidayClaimLine {
  id: string;
  date: TimeProvider;
  userId: string;
  user: User;
  employeeHolidayClaim: EmployeeHolidayClaim;
}
