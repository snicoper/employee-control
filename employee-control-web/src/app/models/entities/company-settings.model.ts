import { Company } from './company.model';

export interface CompanySettings {
  id: string;
  companyId: string;
  timezone: string;
  maximumDailyWorkHours: number;
  geolocationRequired: boolean;
  company: Company;
}
