import { Component, effect, input, output } from '@angular/core';
import { DateTime } from 'luxon';
import { CalendarEvent } from './calendar-event.model';
import { MonthCalendarViewComponent } from './month-calendar-view/month-calendar-view.component';

@Component({
  selector: 'aw-year-calendar-view',
  templateUrl: './year-calendar-view.component.html',
  styleUrl: './year-calendar-view.component.scss',
  standalone: true,
  imports: [MonthCalendarViewComponent]
})
export class YearCalendarViewComponent {
  yearSelected = input.required<number>();
  calendarEvents = input.required<Array<CalendarEvent>>();
  loading = input.required<boolean>();

  selectedChange = output<CalendarEvent>();

  selectedDates: Array<DateTime> = [];

  constructor() {
    this.loadListeners();
  }

  handleSelectChange(calendarEvent: CalendarEvent): void {
    this.selectedChange.emit(calendarEvent);
  }

  private composeDaysInMonth(): void {
    this.selectedDates = [];

    for (let i = 1; i <= 12; i++) {
      this.selectedDates.push(DateTime.local(this.yearSelected(), i, 1));
    }
  }

  private loadListeners(): void {
    effect(() => {
      this.composeDaysInMonth();
    });
  }
}
