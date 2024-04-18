import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateTime } from 'luxon';
import { FormDatetimePickerComponent } from '../../components/forms/inputs/form-datetime-picker/form-datetime-picker.component';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { CustomValidators } from '../../core/validators/custom-validators-form';
import { BadRequest } from '../../models/bad-request';

@Component({
  selector: 'aw-tests',
  standalone: true,
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    PageBaseComponent,
    FormDatetimePickerComponent
  ]
})
export class TestsComponent {
  private readonly formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;

  constructor() {
    this.form = this.formBuilder.group({
      start: [DateTime.local(), [Validators.required, CustomValidators.noFutureDate]]
    });
  }
}
