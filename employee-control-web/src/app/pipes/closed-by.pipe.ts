import { Pipe, PipeTransform } from '@angular/core';
import { ClosedBy } from '../models/entities/types/closed-by.model';

@Pipe({
  name: 'closedBy',
  standalone: true
})
export class ClosedByPipe implements PipeTransform {
  transform(value: ClosedBy): string {
    switch (value) {
      case ClosedBy.employee:
        return 'Empleado';
      case ClosedBy.staff:
        return 'Staff';
      case ClosedBy.system:
        return 'Sistema';
      default:
        return ' ';
    }
  }
}
