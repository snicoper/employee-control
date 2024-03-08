import { DeviceType } from '@aw/models/entities/types/device-type.model';

export interface TimeControlChangeStateRequest {
  employeeId: string;
  deviceType: DeviceType;
  latitude?: number;
  longitude?: number;
}
