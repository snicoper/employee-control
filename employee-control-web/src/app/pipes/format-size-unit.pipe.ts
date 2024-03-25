import { Pipe, PipeTransform } from '@angular/core';
import { formatSizeUnit } from '@aw/core/utils/_index';

/** Pasar bytes a una medida legible según el size. */
@Pipe({
    name: 'formatSizeUnit',
    standalone: true
})
export class FormatSizeUnitPipe implements PipeTransform {
  transform(size: number): string {
    return formatSizeUnit(size);
  }
}
