import { User } from './user.model';

export interface EmployeeSettings {
  id: string;
  userId: string;
  user: User;
  timezone: string;
}
