import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateTime } from 'luxon';

const DateTimeFormats = {
  parse: {
    dateInput: 'LLLL/yyyy'
  },
  display: {
    dateInput: 'LLLL/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

@Component({
  selector: 'aw-month-selector',
  templateUrl: './month-selector.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideLuxonDateAdapter(DateTimeFormats)]
})
export class MonthSelectorComponent {
  dateSelected = input(DateTime.local());
  readOnly = input(false);

  changeMonthSelected = output<DateTime>();

  value = this.dateSelected();

  constructor() {
    this.loadListeners();
  }

  handleChange(date: DateTime, datepicker: MatDatepicker<DateTime>): void {
    this.value = date;
    this.changeMonthSelected.emit(date);
    datepicker.close();
  }

  private loadListeners(): void {
    effect(() => (this.value = this.dateSelected()));
  }
}
