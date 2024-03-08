import { ClosedBy, TimeState } from '@aw/models/entities/types/_index';

// Respuestas a la API al hace peticiones de grupos con TimeControl.
export interface TimeControlGroupResponse {
  day: number;
  dayTitle: string;
  totalMinutes: number;
  times: TimeResponse[];
}

export interface TimeResponse {
  id: string;
  start: Date;
  finish: Date;
  timeState: TimeState;
  closedBy: ClosedBy;
  minutes: number;
  dayPercent: number;
}