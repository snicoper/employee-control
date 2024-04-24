import { Injectable, computed, signal } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable()
export class EmployeeCalendarToolbarService {
  private readonly calendarDatesSelected$ = signal<Array<DateTime>>([]);

  readonly calendarDatesSelected = computed(() => this.calendarDatesSelected$());

  toggleDatesSelected(date: DateTime): void {
    const datesSelected = this.calendarDatesSelected$().find((dt) => dt.valueOf() === date.valueOf());

    if (datesSelected) {
      this.removeDateSelected(date);
    } else {
      this.addDateSelected(date);
    }
  }

  addDateSelected(date: DateTime): void {
    this.calendarDatesSelected$.update((value) => [...value, date]);
  }

  removeDateSelected(date: DateTime): void {
    const daysSelected = [...this.calendarDatesSelected$()];
    const index = daysSelected.findIndex((dt) => dt === date);

    if (!index) {
      return;
    }

    daysSelected.splice(index, 1);
    this.calendarDatesSelected$.set(daysSelected);
  }
}
