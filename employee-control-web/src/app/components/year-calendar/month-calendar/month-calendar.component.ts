import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../cards/card/card.component';
import { CalendarDay } from './calendar-day.model';

@Component({
  selector: 'aw-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.scss',
  standalone: true,
  imports: [CardComponent, NgClass, NgStyle]
})
export class MonthCalendarComponent implements OnInit {
  @Input({ required: true }) date = new Date();
  @Input() calendarDayEvents: CalendarDay[] = [];

  private currentYear = this.date.getFullYear();
  private currentMonth = this.date.getMonth();

  calendarDays: CalendarDay[] = [];
  currentDate = '';
  weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  ngOnInit(): void {
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.currentDate = `${this.months[this.currentMonth]} ${this.currentYear}`;

    this.composeCalendarDays();
  }

  handleClick(calendarDay: CalendarDay): void {
    if (calendarDay.date?.getMonth() !== this.currentMonth) {
      return;
    }
  }

  private composeCalendarDays(): void {
    // Obtener el primer día del mes.
    const dayOne = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // Obtener la última fecha del mes.
    const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Get the day of the last date of the month.
    const dayEnd = new Date(this.currentYear, this.currentMonth, lastDate).getDay();

    // Get the last date of the previous month.
    const monthLastDate = new Date(this.currentYear, this.currentMonth, 0).getDate();

    // Fecha de hoy.
    const today = new Date();

    // Bucle para agregar las últimas fechas del mes anterior.
    for (let i = dayOne; i > 1; i--) {
      this.calendarDays.push({ day: monthLastDate - i + 1, inactive: true, isToday: false });
    }

    // Bucle para agregar las fechas del mes actual.
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const isToday = date.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      const backgroundToday = isToday ? '#6332c5' : '';

      this.calendarDays.push({ date: date, day: i, isToday: isToday, inactive: false, background: backgroundToday });
    }

    // Bucle para agregar las primeras fechas del próximo mes.
    if (dayEnd === 0) {
      return;
    }

    for (let i = dayEnd; i < 7; i++) {
      // Mostrar max. 5 filas x 7 días.
      if (this.calendarDays.length >= 35) {
        break;
      }

      this.calendarDays.push({ day: i - dayEnd + 1, isToday: false, inactive: true });
    }
  }
}
