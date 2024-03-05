import { Company } from './company.model';

export interface CategoryAbsence {
  id: string;
  description: string;
  background: string;
  color: string;
  active: boolean;
  companyId: string;
  company: Company;
}
