import { TimeProvider } from '../../../core/types/time-provider.type';
import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { DeviceType } from '../../../models/entities/types/device-type.model';
import { TimeState } from '../../../models/entities/types/time-state.model';

export interface TimeControlRecordDetailsResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  incidence: boolean;
  incidenceDescription?: string;
  start: TimeProvider;
  finish: TimeProvider;
  closedBy: ClosedBy;
  timeState: TimeState;
  deviceTypeStart: DeviceType;
  deviceTypeFinish: DeviceType;
  latitudeStart?: number;
  longitudeStart?: number;
  latitudeFinish?: number;
  longitudeFinish?: number;
  duration: number;
}
