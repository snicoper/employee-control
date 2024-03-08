import { environment } from '@aw/environments/environment';

/** Wrapper para obtener la configuración en base al environment. */
export const AppEnvironments = {
  siteName: environment.siteName,
  apiUrl: environment.apiUrl,
  apiSegment: environment.apiSegment,
  baseApiUrl: `${environment.apiUrl}/${environment.apiSegment}`,
  siteUrl: environment.siteUrl,
  isDebug: !environment.production
};
