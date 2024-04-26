import { TimeProvider } from '../../core/types/time-provider.type';
import { TimeState } from '../entities/types/time-state.model';

/** Estado de TimeControl del empleado actual. */
export interface TimeControlStateResponse {
  start: TimeProvider;
  timeState: TimeState;
}
