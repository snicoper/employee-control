import { Pipe, PipeTransform } from '@angular/core';
import { DeviceType } from '@aw/models/entities/types/device-type.model';

@Pipe({
    name: 'deviceType',
    standalone: true
})
export class DeviceTypePipe implements PipeTransform {
  transform(value: DeviceType): string {
    switch (value) {
      case DeviceType.desktop:
        return '<span class="fa-solid fa-desktop text-warning"></span>';
      case DeviceType.mobile:
        return '<span class="fa-solid fa-mobile-retro text-warning"></span>';
      case DeviceType.tablet:
        return '<span class="fa-solid fa-tablet-screen-button text-warning"></span>';
      case DeviceType.system:
        return '<span class="fa-brands fa-windows text-warning"></span>';
      default:
        return '<span class="fa-solid fa-question text-warning"></span>';
    }
  }
}
