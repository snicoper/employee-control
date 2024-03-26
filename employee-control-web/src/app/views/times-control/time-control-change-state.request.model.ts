import { DeviceType } from '../../models/entities/types/_index';

export interface TimeControlChangeStateRequest {
  employeeId: string;
  deviceType: DeviceType;
  latitude?: number;
  longitude?: number;
}
