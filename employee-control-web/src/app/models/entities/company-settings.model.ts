import { Company } from './company.model';

export interface CompanySettings {
  id: string;
  timezone: string;
  periodTimeControlMax: number;
  weeklyWorkingHours: number;
  geolocationRequired: boolean;
  companyId: string;
  company: Company;
}
