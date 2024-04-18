import { DateTime } from 'luxon';
import { PeriodDatetime } from './period-datetime';

export class Period {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  toDateTime(): PeriodDatetime {
    return new PeriodDatetime(DateTime.fromJSDate(this.start), DateTime.fromJSDate(this.end));
  }
}
