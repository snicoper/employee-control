import { TimeProvider } from '../../core/types/time-provider.type';

export interface CompanyHoliday {
  id: string;
  date: TimeProvider;
  description: string;
}
