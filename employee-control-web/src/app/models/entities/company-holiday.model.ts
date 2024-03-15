import { Company } from './company.model';

export interface CompanyHoliday {
  id: string;
  day: Date;
  description: string;
  companyId: string;
  company: Company;
}
