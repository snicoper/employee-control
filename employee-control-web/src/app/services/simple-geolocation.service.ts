import { Injectable, computed, signal } from '@angular/core';
import { urlReplaceParams } from '../core/utils/common-utils';

@Injectable({ providedIn: 'root' })
export class SimpleGeolocationService {
  private readonly isAvailable$ = signal(false);

  private readonly urlOpenStreetMap = 'https://www.openstreetmap.org/#map=18/{latitude}/{longitude}';

  geolocationIsAvailable = computed(() => this.isAvailable$());

  constructor() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        this.isAvailable$.set(true);
      } else if (result.state === 'prompt') {
        this.isAvailable$.set(false);
      }
      // Don't do anything if the permission was denied.
    });
  }

  /** Obtener la posición actual. */
  async getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
  }

  /** Genera link a Open Street Map. */
  getOpenStreetMapLink(latitude: number, longitude: number): string {
    const url = urlReplaceParams(this.urlOpenStreetMap, { latitude: String(latitude), longitude: String(longitude) });

    return url;
  }

  async pleaseLetMeNotify(): Promise<PermissionStatus> {
    return await navigator.permissions.query({ name: 'geolocation' });
  }
}
