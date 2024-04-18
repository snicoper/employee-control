import { Company } from './company.model';
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
  company?: Company;
  userRoles: Array<UserRole>;
}
