import { NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/bad-request';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-textarea',
  templateUrl: './form-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [FormsModule, NgClass, FieldErrorComponent]
})
export class FormTextareaComponent implements ControlValueAccessor {
  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() cols = 0;

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

  onChangeValue(value: string): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName);

    return !!((this.submitted && control?.invalid) || this.badRequest?.errors[this.fieldName]);
  }
}
