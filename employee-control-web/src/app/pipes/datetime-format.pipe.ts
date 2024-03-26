import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'datetimeFormat',
  standalone: true
})
export class DatetimeFormatPipe implements PipeTransform {
  transform(value: Date | undefined, format = 'DDD'): string {
    if (!value) {
      return '';
    }

    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  }
}
