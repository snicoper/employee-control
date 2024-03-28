import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BadRequest } from '../../../../models/bad-request';

@Component({
  selector: 'aw-field-error',
  templateUrl: './field-error.component.html',
  standalone: true
})
export class FieldErrorComponent implements OnInit {
  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input() fieldText = '';
  @Input() fieldName = '';
  @Input() validateOnlyOnSubmit = false;

  control: AbstractControl | undefined;

  ngOnInit(): void {
    this.control = this.form?.get(this.fieldName) as AbstractControl;
  }

  formHasErrors(): boolean | ValidationErrors | null | undefined {
    return (this.submitted && this.form?.dirty) || (this.form?.touched && this.control?.errors);
  }

  controlHasErrors(): boolean {
    const validateRules = this.validateOnlyOnSubmit
      ? this.submitted && this.control && this.control.dirty && this.control?.errors
      : this.control?.dirty && this.control.errors;

    return !!(validateRules || (this.submitted && this.control?.errors));
  }

  getBadRequestErrors(): string[] | undefined {
    if (this.badRequest && this.badRequest.status === HttpStatusCode.BadRequest) {
      return this.badRequest.errors[this.fieldName];
    }

    return undefined;
  }

  getControlErrorByErrorName(errorName: string): boolean | null {
    return this.control?.hasError(errorName) ?? null;
  }
}
