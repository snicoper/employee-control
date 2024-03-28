import { TimeState } from './entities/types/time-state.model';

export interface CurrentTimeControlResponse {
  start: Date;
  timeState: TimeState;
}
