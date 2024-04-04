import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime, Info } from 'luxon';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { CardComponent } from '../../cards/card/card.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { CalendarDay } from './calendar-day.model';

@Component({
  selector: 'aw-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.scss',
  standalone: true,
  imports: [NgClass, NgStyle, CardComponent, SpinnerComponent, TooltipDirective]
})
export class MonthCalendarComponent implements OnInit {
  @Input({ required: true }) date!: DateTime;
  @Input() calendarDayEvents: CalendarDay[] = [];
  @Input({ required: true }) loading = true;

  @Output() calendarDayClick = new EventEmitter<CalendarDay>();

  calendarDays: CalendarDay[] = [];
  currentDate = '';
  weeks = Info.weekdays('short');

  ngOnInit(): void {
    this.currentDate = `${this.date.monthLong} ${this.date.year}`;

    this.renderCalendar();
  }

  handleCalendarDayClick(calendarDay: CalendarDay): void {
    if (calendarDay.inactive) {
      return;
    }

    this.calendarDayClick.emit(calendarDay);
  }

  private renderCalendar(): void {
    // Obtener el día de la semana del primer día del mes.
    const dayOne = DateTime.local(this.date.year, this.date.month).startOf('month').weekday;

    // Obtener el último día del mes.
    const lastDate = DateTime.local(this.date.year, this.date.month).endOf('month').day;

    // Obtener el día de semana del último día del mes anterior.
    const dayEnd = DateTime.local(this.date.year, this.date.month).minus({ month: 1 }).endOf('month').weekday;

    // Obtener el último día del mes.
    const monthLastDate = DateTime.local(this.date.year, this.date.month).endOf('month').day;

    // Fecha de hoy.
    const today = DateTime.local().startOf('day');

    // Si tiene 0 días dayOne, rompe el calendario cuando el día 1 es Domingo.
    const prevDaysWeek = dayOne === 1 ? 8 : dayOne;

    // Bucle para agregar las últimas fechas del mes anterior.
    for (let i = prevDaysWeek; i > 1; i--) {
      this.calendarDays.push({
        day: monthLastDate - i,
        inactive: true,
        isToday: false,
        canAddEvent: false
      });
    }

    // Bucle para agregar las eventos del mes actual.
    for (let i = 1; i <= lastDate; i++) {
      const date = DateTime.local(this.date.year, this.date.month, i).startOf('day');
      const isToday = date.valueOf() === today.valueOf();
      const event = this.calendarDayEvents.find((d) => d.date?.valueOf() === date.valueOf());

      if (event) {
        event.isToday = isToday;
        this.calendarDays.push(event);
        continue;
      }

      this.calendarDays.push({
        date: date,
        day: i,
        isToday: isToday,
        inactive: false,
        canAddEvent: true
      });
    }

    // Bucle para agregar las primeras fechas del mes siguiente.
    // Mostrar 6 filas x 7 días, 42 días al mes..
    for (let i = dayEnd; i < 14; i++) {
      if (this.calendarDays.length >= 42) {
        break;
      }

      this.calendarDays.push({
        day: i - dayEnd + 1,
        isToday: false,
        inactive: true,
        canAddEvent: false
      });
    }
  }
}
