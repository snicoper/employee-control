import { Injectable } from '@angular/core';
import { urlReplaceParams } from '@aw/core/utils/common-utils';

@Injectable({ providedIn: 'root' })
export class SimpleGeolocationService {
  private readonly urlOpenStreetMap = 'https://www.openstreetmap.org/#map=18/{latitude}/{longitude}';

  get isAvailable(): boolean {
    return Object.hasOwn(navigator, 'geolocation');
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
}
