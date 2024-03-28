import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

export abstract class CustomValidators {
  /** Comprobar que una fecha sea menor a otra. */
  static readonly dateStartGreaterThanFinish = (controlDateStart: string, controlDateFinish: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlDateStart);
      const checkControl = controls.get(controlDateFinish);

      const start = DateTime.fromJSDate(new Date(control?.value));
      const finish = DateTime.fromJSDate(new Date(checkControl?.value));

      if (start.valueOf() > finish.valueOf()) {
        checkControl?.setErrors({ startGreaterThanFinish: true });

        return { startGreaterThanFinish: true };
      }

      return null;
    };
  };

  /** Contraseñas iguales. */
  static readonly passwordMustMatch = (controlPassword: string, controlConfirmPassword: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlPassword);
      const checkControl = controls.get(controlConfirmPassword);

      if (control?.value !== checkControl?.value) {
        checkControl?.setErrors({ noPasswordMatch: true });

        return { noPasswordMatch: true };
      }

      return null;
    };
  };

  /** El valor ha de ser un color hexadecimal. */
  static readonly colorHexadecimal = (control: AbstractControl): ValidationErrors | null => {
    const match = /^#[0-9A-F]{6}$/i.test(control?.value);

    if (!match) {
      return { colorHexadecimal: true };
    }

    return null;
  };

  /** No permite fechas futuras. */
  static readonly noFutureDate = (control: AbstractControl): ValidationErrors | null => {
    const value = DateTime.fromJSDate(new Date(control?.value));

    if (value.toMillis() > DateTime.local().toMillis()) {
      return { noFutureDate: true };
    }

    return null;
  };

  /** Validación de un array con un valor > 0.*/
  static readonly minLengthArray = (control: AbstractControl): ValidationErrors | null => {
    const values = control?.value;

    if (!values) {
      return { required: true };
    }

    return null;
  };
}
