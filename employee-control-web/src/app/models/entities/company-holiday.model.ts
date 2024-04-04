import { Company } from './company.model';

export interface CompanyHoliday {
  id: string;
  date: Date;
  description: string;
  companyId: string;
  company: Company;
}
