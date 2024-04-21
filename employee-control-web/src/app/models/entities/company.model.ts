import { CategoryAbsence } from './category-absence.model';
import { CompanySettings } from './company-settings.model';
import { CompanyTask } from './company-task.model';
import { Department } from './department.model';
import { User } from './user.model';
import { WorkingDaysWeek } from './working-days-week.model';

export interface Company {
  id: string;
  name: string;
  companySettings: CompanySettings;
  workingDaysWeek: WorkingDaysWeek;
  departments: Array<Department>;
  users: Array<User>;
  companyTasks: Array<CompanyTask>;
  categoryAbsences: Array<CategoryAbsence>;
}
