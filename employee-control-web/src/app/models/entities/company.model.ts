import { CategoryAbsence } from './category-absence.model';
import { CompanySettings } from './company-settings.model';
import { CompanyTask } from './company-task.model';
import { Department } from './department.model';
import { User } from './user.model';

export interface Company {
  id: string;
  name: string;
  companySettings: CompanySettings;
  departments: Array<Department>;
  users: Array<User>;
  companyTasks: Array<CompanyTask>;
  categoryAbsences: Array<CategoryAbsence>;
}
