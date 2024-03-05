import { Company } from './company.model';

export interface CompanySettings {
  id: string;
  companyId: string;
  timezone: string;
  company: Company;
}
