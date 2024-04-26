import { Component, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { BadRequest } from '../../../../models/bad-request';
import { CompanyCalendar } from '../../../../models/entities/company-calendar.model';
import { CompanyCalendarsApiService } from '../../../../services/api/company-calendars-api.service';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

@Component({
  selector: 'aw-form-company-calendars',
  templateUrl: './form-company-calendars.component.html',
  styleUrl: './form-company-calendars.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCompanyCalendarsComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FieldErrorComponent]
})
export class FormCompanyCalendarsComponent implements ControlValueAccessor {
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);

  badRequest = input.required<BadRequest | undefined>();
  form = input.required<FormGroup>();
  submitted = input.required<boolean>();
  fieldName = input.required<string>();
  id = input(Math.random().toString());

  value = '';
  isDisabled = false;
  companyCalendars: Array<CompanyCalendar> = [];

  constructor() {
    this.companyCalendarsApiService.get<Array<CompanyCalendar>>(ApiUrl.companyCalendar.getCompanyCalendars).subscribe({
      next: (result: Array<CompanyCalendar>) => {
        this.companyCalendars = result;
      }
    });
  }

  onChange = (_: string): void => {};

  onTouch = (): void => {};

  writeValue(value: string): void {
    if (value !== this.value) {
      this.value = value || '';
      this.onChange(this.value);
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChangeValue(value: string): void {
    this.onChange(value);
  }
}
