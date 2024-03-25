import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'datetime',
    standalone: true
})
export class DatetimePipe implements PipeTransform {
  transform(value: Date | string | undefined, format = DateTime.DATETIME_SHORT): string {
    if (!value) {
      return '';
    }

    return DateTime.fromJSDate(new Date(value)).toLocaleString(format);
  }
}
