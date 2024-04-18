import { Pipe, PipeTransform } from '@angular/core';
import { DeviceType } from '../models/entities/types/device-type.model';

@Pipe({
  name: 'deviceType',
  standalone: true
})
export class DeviceTypePipe implements PipeTransform {
  transform(value: DeviceType): string {
    switch (value) {
      case DeviceType.Desktop:
        return '<span class="text-warning material-symbols-outlined">computer</span>';
      case DeviceType.Mobile:
        return '<span class="text-warning material-symbols-outlined">smartphone</span>';
      case DeviceType.Tablet:
        return '<span class="text-warning material-symbols-outlined">tablet_mac</span>';
      case DeviceType.System:
        return '<span class="text-warning material-symbols-outlined">dns</span>';
      default:
        return '<span class="text-warning material-symbols-outlined">exclamation</span>';
    }
  }
}
