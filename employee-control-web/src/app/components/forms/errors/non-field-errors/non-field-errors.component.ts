import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ValidationError } from '../../../../core/types/validation-error';
import { BadRequest } from '../../../../models/bad-request';

@Component({
  selector: 'aw-non-field-errors',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './non-field-errors.component.html'
})
export class NonFieldErrorsComponent {
  badRequest = input.required<BadRequest | undefined>();

  get hasErrors(): boolean {
    if (this.badRequest()?.errors) {
      return !!this.badRequest()?.errors[ValidationError.NonFieldErrors];
    }

    return false;
  }

  getErrors(): Array<string> | undefined {
    if (this.badRequest()?.errors) {
      return this.badRequest()?.errors[ValidationError.NonFieldErrors];
    }

    return undefined;
  }
}
