import { Company } from './company.model';

export interface CompanyTask {
  id: string;
  companyId: string;
  name: string;
  active: boolean;
  background: string;
  color: string;
  created: Date;
  company?: Company;
}
