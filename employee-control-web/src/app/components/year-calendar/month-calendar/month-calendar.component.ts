import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() calendarDayClick = new EventEmitter<CalendarDay>();

  private currentYear = this.date.getFullYear();
  private currentMonth = this.date.getMonth();

  calendarDays: CalendarDay[] = [];
  currentDate = '';
  weeks = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
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

    this.renderCalendar();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    if (calendarDay.inactive) {
      return;
    }

    this.calendarDayClick.emit(calendarDay);
  }

  private renderCalendar(): void {
    // Obtener el día de la semana del primer día del mes actual.
    const dayOne = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // Obtener la última fecha del mes actual.
    const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Obtener el día de semana del último día del mes anterior.
    const dayEnd = new Date(this.currentYear, this.currentMonth, lastDate).getDay();

    // Obtener la fecha del último día del mes.
    const monthLastDate = new Date(this.currentYear, this.currentMonth, 0).getDate();

    // Fecha de hoy.
    const today = new Date();

    // Si tiene 0 días dayOne, rompe el calendario cuando el 1 es Domingo.
    const prevDaysWeek = dayOne === 0 ? 7 : dayOne;

    // Bucle para agregar las últimas fechas del mes anterior.
    for (let i = prevDaysWeek; i > 1; i--) {
      this.calendarDays.push({ day: monthLastDate - i + 2, inactive: true, isToday: false });
    }

    // Bucle para agregar las fechas del mes actual.
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const event = this.calendarDayEvents.find((d) => d.date?.getTime() === date.getTime());

      if (event) {
        this.calendarDays.push(event);
        continue;
      }

      const isToday = date.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      const backgroundToday = isToday ? '#6332c5' : '';

      this.calendarDays.push({ date: date, day: i, isToday: isToday, inactive: false, background: backgroundToday });
    }

    for (let i = dayEnd; i < 14; i++) {
      // Mostrar max. 6 filas x 7 días.
      if (this.calendarDays.length >= 42) {
        break;
      }

      this.calendarDays.push({ day: i - dayEnd + 1, isToday: false, inactive: true });
    }
  }
}
