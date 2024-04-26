import { TimeProvider } from '../../core/types/time-provider.type';
import { ClosedBy } from './types/closed-by.model';
import { DeviceType } from './types/device-type.model';
import { TimeState } from './types/time-state.model';
import { User } from './user.model';

export interface TimeControl {
  id: string;
  start: TimeProvider;
  finish?: TimeProvider;
  incidence: boolean;
  incidenceDescription?: string;
  duration?: number;
  closedBy: ClosedBy;
  timeState: TimeState;
  deviceTypeStart: DeviceType;
  deviceTypeFinish?: DeviceType;
  latitudeStart?: number;
  longitudeStart?: number;
  latitudeFinish?: number;
  longitudeFinish?: number;
  userId: string;
  user?: User;
}
