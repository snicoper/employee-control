import { NgClass } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/_index';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-color',
  templateUrl: './form-color.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormColorComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [FormsModule, NgClass, FieldErrorComponent]
})
export class FormColorComponent implements ControlValueAccessor {
  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';

  value = '';
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: string): void => {};

  onTouch = (): void => {};

  writeValue(value: string): void {
    if (value !== undefined && value !== this.value) {
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

  onChangeValue(value: any): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName) as FormGroup;

    return !!((this.submitted && control.invalid) || this.badRequest?.errors[this.fieldName]);
  }
}
