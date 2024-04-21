import { Company } from './company.model';

export interface Department {
  id: string;
  name: string;
  active: boolean;
  background: string;
  color: string;
  companyId: string;
  company: Company;
}
