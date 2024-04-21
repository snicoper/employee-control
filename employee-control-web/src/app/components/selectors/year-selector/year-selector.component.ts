import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateTime } from 'luxon';

const DateTimeFormats = {
  parse: {
    dateInput: 'yyyy'
  },
  display: {
    dateInput: 'yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'yyyy'
  }
};

@Component({
  selector: 'aw-year-selector',
  templateUrl: './year-selector.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideLuxonDateAdapter(DateTimeFormats)]
})
export class YearSelectorComponent {
  dateSelected = input(DateTime.local());
  readOnly = input(false);

  changeYearSelected = output<DateTime>();

  value = this.dateSelected();

  constructor() {
    this.loadListeners();
  }

  handleChange(date: DateTime, datepicker: MatDatepicker<DateTime>): void {
    this.value = date;
    this.changeYearSelected.emit(date);
    datepicker.close();
  }

  private loadListeners(): void {
    effect(() => (this.value = this.dateSelected()));
  }
}
