import { Company } from './company.model';

export interface Department {
  id: string;
  name: string;
  active: boolean;
  companyId: string;
  background: string;
  color: string;
  company: Company;
}
