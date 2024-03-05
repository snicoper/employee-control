import { Pipe, PipeTransform } from '@angular/core';

/**
 * Devuelve un icon en función del valor booleano.
 * Para tipos booleans, retorna el HTML con un icono según el valor.
 *
 * @example:
 *  <td [innerHTML]="employee.is_staff | boolToIcon"></td>
 */
@Pipe({ name: 'boolToIcon' })
export class BoolToIconPipe implements PipeTransform {
  transform(value: boolean | undefined): string {
    if (value) {
      return '<span class="icon fas fa-check text-success"></span>';
    }

    return '<span class="icon fas fa-times text-danger"></span>';
  }
}
