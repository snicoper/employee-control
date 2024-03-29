import { NgClass } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputTypes } from '../../../../core/types/form-input-types';
import { BadRequest } from '../../../../models/bad-request';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-floating',
  templateUrl: './form-floating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFloatingComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [FormsModule, NgClass, FieldErrorComponent]
})
export class FormFloatingComponent implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() id: string;
  @Input() inputType = FormInputTypes.text;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() placeholder = '';
  @Input() isDisabled = false;

  value = '';

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
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  onChangeValue(value: string): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName) as FormGroup;

    return !!((this.submitted && control.invalid) || this.badRequest?.errors[this.fieldName]);
  }
}
