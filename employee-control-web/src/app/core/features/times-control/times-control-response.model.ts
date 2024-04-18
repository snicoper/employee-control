import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { TimeState } from '../../../models/entities/types/time-state.model';

// Respuestas a la API al hacer peticiones de grupos con TimeControl.
export interface TimeControlGroupResponse {
  day: number;
  dayTitle: string;
  totalMinutes: number;
  times: Array<TimeResponse>;
}

export interface TimeResponse {
  id: string;
  start: Date;
  finish: Date;
  incidence: boolean;
  timeState: TimeState;
  closedBy: ClosedBy;
  minutes: number;
  dayPercent: number;
}
