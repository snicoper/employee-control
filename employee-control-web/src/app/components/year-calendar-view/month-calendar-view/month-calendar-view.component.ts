import { CommonModule } from '@angular/common';
import { Component, OnInit, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
  MatCalendarView,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateTime } from 'luxon';
import { CommonUtils } from '../../../core/utils/common-utils';
import { DatetimeFormatPipe } from '../../../pipes/datetime-format.pipe';
import { CalendarClassColor } from '../calendar-class-color';
import { CalendarEvent } from '../calendar-event.model';

@Component({
  selector: 'aw-month-calendar-view',
  standalone: true,
  templateUrl: './month-calendar-view.component.html',
  styleUrl: './month-calendar-view.component.scss',
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatProgressSpinnerModule, DatetimeFormatPipe]
})
export class MonthCalendarViewComponent implements OnInit {
  selectedDate = input.required<DateTime>();
  calendarEvents = input.required<Array<CalendarEvent>>();
  loading = input.required<boolean>();

  selectedChange = output<CalendarEvent>();

  selected!: DateTime;
  title = '';

  ngOnInit(): void {
    this.selected = this.selectedDate();
    this.title = CommonUtils.ucFirst(this.selected.toFormat('LLLL yyyy'));
  }

  dateClass: MatCalendarCellClassFunction<DateTime> = (
    cellDate: DateTime,
    view: MatCalendarView
  ): MatCalendarCellCssClasses => {
    if (view === 'month') {
      const calendarEvent = this.findCalendarEvent(cellDate);

      if (calendarEvent) {
        return `${calendarEvent.cssClass} custom-event`;
      }
    }

    return '';
  };

  handleDateFilter = (cellDate: DateTime): boolean => {
    const calendarEvent = this.findCalendarEvent(cellDate);

    return calendarEvent === undefined || calendarEvent?.selectable;
  };

  handleSelectedChange(cellDate: DateTime | null): void {
    if (!cellDate) {
      return;
    }

    const calendarEvent = this.findCalendarEvent(cellDate);

    if (calendarEvent) {
      this.selectedChange.emit(calendarEvent);

      return;
    }

    this.selectedChange.emit({
      date: cellDate,
      description: '',
      selectable: true,
      cssClass: CalendarClassColor.None
    });
  }

  private findCalendarEvent(cellDate: DateTime): CalendarEvent | undefined {
    const calendarEvent = this.calendarEvents().find(
      (event) => event.date.day === cellDate.day && event.date.month === cellDate.month
    );

    return calendarEvent;
  }
}
