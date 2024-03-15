import { Company } from './company.model';

export interface WorkDays {
  id: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  companyId: string;
  company: Company;
}
