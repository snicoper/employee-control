import { DeviceType } from '../../models/entities/types/_index';

export interface TimeControlProgressChangeStateRequest {
  employeeId: string;
  deviceType: DeviceType;
  latitude?: number;
  longitude?: number;
}
