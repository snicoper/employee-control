import { Company } from './company.model';

export interface CompanyTask {
  id: string;
  name: string;
  active: boolean;
  background: string;
  color: string;
  created: Date;
  companyId: string;
  company?: Company;
}
