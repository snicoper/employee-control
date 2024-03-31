import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from './month-calendar/calendar-day.model';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

@Component({
  selector: 'aw-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrl: './year-calendar.component.scss',
  standalone: true,
  imports: [MonthCalendarComponent]
})
export class YearCalendarComponent implements OnInit {
  @Input({ required: true }) year = new Date().getFullYear();
  @Input() calendarDayEvents: CalendarDay[] = [];

  @Output() calendarDayClick = new EventEmitter<CalendarDay>();

  monthDatesInYear: Date[] = [];

  ngOnInit(): void {
    this.composeDaysInMonth();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    this.calendarDayClick.emit(calendarDay);
  }

  private composeDaysInMonth(): void {
    for (let i = 0; i < 12; i++) {
      const date = new Date(this.year, i);
      this.monthDatesInYear.push(date);
    }
  }
}
