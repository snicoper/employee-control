import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FieldErrorComponent } from './errors/field-error/field-error.component';
import { NonFieldErrorsComponent } from './errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from './inputs/form-checkbox/form-checkbox.component';
import { FormColorComponent } from './inputs/form-color/form-color.component';
import { FormDatepickerComponent } from './inputs/form-datepicker/form-datepicker.component';
import { FormFloatingComponent } from './inputs/form-floating/form-floating.component';
import { FormInputComponent } from './inputs/form-input/form-input.component';
import { FormSwitchComponent } from './inputs/form-switch/form-switch.component';
import { FormTextareaComponent } from './inputs/form-textarea/form-textarea.component';
import { FormTimePickerComponent } from './inputs/form-timepicker/form-timepicker.component';
import { FormTimezoneComponent } from './inputs/form-timezone/form-timezone.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormCheckboxComponent,
    FormColorComponent,
    FormDatepickerComponent,
    FormFloatingComponent,
    FormInputComponent,
    FormSwitchComponent,
    FormTextareaComponent,
    FormTimePickerComponent,
    FormTimezoneComponent
  ],
  exports: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormCheckboxComponent,
    FormColorComponent,
    FormDatepickerComponent,
    FormFloatingComponent,
    FormInputComponent,
    FormSwitchComponent,
    FormTextareaComponent,
    FormTimePickerComponent,
    FormTimezoneComponent
  ]
})
export class AwFormsModule {}
