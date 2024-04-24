import { User } from '../../models/entities/user.model';

export interface EmployeeHolidayResponse {
  id: string;
  year: number;
  totalDays: number;
  consumed: number;
  available: number;
  userId: string;
  user: User;
}
