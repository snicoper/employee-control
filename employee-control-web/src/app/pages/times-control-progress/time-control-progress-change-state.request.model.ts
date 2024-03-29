import { DeviceType } from '../../models/entities/types/device-type.model';

export interface TimeControlProgressChangeStateRequest {
  employeeId: string;
  deviceType: DeviceType;
  latitude?: number;
  longitude?: number;
}
