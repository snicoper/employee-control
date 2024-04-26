import { TimeProvider } from '../../core/types/time-provider.type';

export interface CompanyTask {
  id: string;
  name: string;
  active: boolean;
  background: string;
  color: string;
  created: TimeProvider;
}
