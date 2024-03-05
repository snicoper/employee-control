import { TimeState } from './entities/types/_index';

export interface CurrentTimeControlResponse {
  start: Date;
  timeState: TimeState;
}
