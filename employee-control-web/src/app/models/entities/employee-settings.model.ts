import { User } from './user.model';

export interface EmployeeSettings {
  id: string;
  timezone: string;
  userId: string;
  user: User;
}
