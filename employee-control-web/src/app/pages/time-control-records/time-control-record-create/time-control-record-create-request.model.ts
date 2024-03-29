import { DeviceType } from '../../../models/entities/types/device-type.model';
import { TimeState } from '../../../models/entities/types/time-state.model';

export interface TimeControlRecordCreateRequest {
  userId: string;
  start: string;
  finish: string;
  timeState: TimeState;
  deviceType: DeviceType;
}
