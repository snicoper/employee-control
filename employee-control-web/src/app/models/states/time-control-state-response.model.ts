import { TimeState } from '../entities/types/time-state.model';

export interface TimeControlStateResponse {
  start: Date;
  timeState: TimeState;
}
