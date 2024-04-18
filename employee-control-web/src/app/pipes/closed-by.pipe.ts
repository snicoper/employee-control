import { Pipe, PipeTransform } from '@angular/core';
import { ClosedBy } from '../models/entities/types/closed-by.model';

@Pipe({
  name: 'closedBy',
  standalone: true
})
export class ClosedByPipe implements PipeTransform {
  transform(value: ClosedBy): string {
    switch (value) {
      case ClosedBy.Employee:
        return 'Empleado';
      case ClosedBy.Staff:
        return 'Staff';
      case ClosedBy.System:
        return 'Sistema';
      default:
        return ' ';
    }
  }
}
