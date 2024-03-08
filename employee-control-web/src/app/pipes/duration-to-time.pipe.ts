import { Pipe, PipeTransform } from '@angular/core';
import { DatetimeUtils } from '@aw/core/utils/datetime-utils';

@Pipe({ name: 'durationToTime' })
export class DurationToTimePipe implements PipeTransform {
  transform(value: number): string {
    const result = DatetimeUtils.formatMinutesToTime(value);

    return result;
  }
}
