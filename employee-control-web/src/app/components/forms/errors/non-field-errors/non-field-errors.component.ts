import { Component, Input } from '@angular/core';
import { ValidationErrors } from '../../../../core/types/_index';
import { BadRequest } from '../../../../models/_index';

@Component({
  selector: 'aw-non-field-errors',
  templateUrl: './non-field-errors.component.html',
  standalone: true
})
export class NonFieldErrorsComponent {
  @Input({ required: true }) badRequest: BadRequest | undefined;

  validationErrors = ValidationErrors;

  get hasErrors(): boolean {
    return !!this.badRequest?.errors[ValidationErrors.nonFieldErrors];
  }

  getErrors(): string[] | undefined {
    return this.badRequest?.errors[ValidationErrors.nonFieldErrors];
  }
}
