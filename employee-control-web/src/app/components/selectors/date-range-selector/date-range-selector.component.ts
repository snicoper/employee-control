import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateTime } from 'luxon';
import { PeriodDatetime } from '../../../models/period-datetime';

@Component({
  selector: 'aw-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrl: './date-range-selector.component.scss',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatDatepickerModule]
})
export class DateRangeSelectorComponent {
  label = input('Rango de fechas');
  rangeValue = input<PeriodDatetime>();
  disabled = input(false);
  readonly = input(true);
  hint = input<string>();

  dateChange = output<PeriodDatetime>();

  dateStart = DateTime.local();
  dateEnd = DateTime.local();

  constructor() {
    this.loadListeners();
  }

  handleDateChange(): void {
    if (!this.dateStart || !this.dateEnd) {
      return;
    }

    const period = new PeriodDatetime(this.dateStart.startOf('day'), this.dateEnd.endOf('day'));
    this.dateChange.emit(period);
  }

  private loadListeners(): void {
    effect(() => {
      this.dateStart = this.rangeValue()?.start ?? this.dateStart;
      this.dateEnd = this.rangeValue()?.end ?? this.dateEnd;
    });
  }
}
