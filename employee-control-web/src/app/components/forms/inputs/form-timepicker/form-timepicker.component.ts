import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, forwardRef, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { LocalizationUtils } from '../../../../core/features/localizations/localization-utils';
import { LocalizationService } from '../../../../core/features/localizations/localization.service';
import { BadRequest } from '../../../../models/bad-request';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-timepicker',
  templateUrl: './form-timepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTimePickerComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [TimepickerModule, FormsModule, NgClass, FieldErrorComponent]
})
export class FormTimePickerComponent implements ControlValueAccessor {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input() bsConfig: Partial<BsDatepickerConfig>;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() showMeridian = false;
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() isDisabled = false;

  value!: Date;

  constructor() {
    this.id = Math.random().toString();

    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default',
      useUtc: true
    };
  }

  onChange = (_: Date): void => {};

  onTouch = (): void => {};

  writeValue(value: Date): void {
    if (value !== undefined && value !== this.value) {
      this.value = value;
      this.onChange(this.value);
    } else {
      this.value = new Date();
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

  onChangeValue(value: Date): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName) as AbstractControl;

    return !!((this.submitted && control.invalid) || this.badRequest?.errors[this.fieldName]);
  }
}
