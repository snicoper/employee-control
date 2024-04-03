import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { CalendarDay } from './month-calendar/calendar-day.model';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

@Component({
  selector: 'aw-year-calendar',
  templateUrl: './year-calendar.component.html',
  standalone: true,
  imports: [MonthCalendarComponent]
})
export class YearCalendarComponent implements OnInit {
  @Input({ required: true }) date!: DateTime;
  @Input() calendarDayEvents: CalendarDay[] = [];
  @Input({ required: true }) loading = true;

  @Output() calendarDayClick = new EventEmitter<CalendarDay>();

  monthDatesInYear: DateTime[] = [];

  ngOnInit(): void {
    this.composeDaysInMonth();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    this.calendarDayClick.emit(calendarDay);
  }

  private composeDaysInMonth(): void {
    for (let i = 1; i <= 12; i++) {
      this.monthDatesInYear.push(DateTime.local(this.date.year, i, 1));
    }
  }
}
