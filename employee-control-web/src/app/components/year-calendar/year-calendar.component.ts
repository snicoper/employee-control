import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from './month-calendar/calendar-day.model';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

@Component({
  selector: 'aw-year-calendar',
  templateUrl: './year-calendar.component.html',
  standalone: true,
  imports: [MonthCalendarComponent]
})
export class YearCalendarComponent implements OnInit {
  @Input({ required: true }) year = new Date().getFullYear();
  @Input() calendarDayEvents: CalendarDay[] = [];

  monthsInYear: Date[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 12; i++) {
      const date = new Date(this.year, i);
      this.monthsInYear.push(date);
    }
  }
}
