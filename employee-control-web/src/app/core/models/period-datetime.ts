import { DateTime } from 'luxon';
import { DateTimeUtils } from '../utils/datetime-utils';

export class PeriodDatetime {
  start: DateTime;
  end: DateTime;

  constructor(start: DateTime, end: DateTime) {
    this.start = start;
    this.end = end;
  }

  /** Obtener la duración del periodo en minutos. */
  duration(): number {
    return DateTimeUtils.duration(this.start, this.end);
  }
}
