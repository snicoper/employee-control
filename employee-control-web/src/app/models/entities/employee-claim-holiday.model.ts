import { User } from './user.model';

export interface EmployeeClaimHoliday {
  id: string;
  date: Date;
  created?: Date;
  accepted: boolean;
  description?: string;
  userId: string;
  user: User;
}
