import { DeviceType } from '../../../models/entities/types/_index';

export interface TimeControlRecordCreateRequest {
  userId: string;
  start: string;
  finish: string;
  deviceType: DeviceType;
}
