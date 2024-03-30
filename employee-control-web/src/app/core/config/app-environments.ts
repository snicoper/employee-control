import { environment } from '../../../environments/environment';

/** Wrapper para obtener la configuración en base al environment. */
export const AppEnvironments = {
  siteName: environment.siteName,
  apiUrl: environment.apiUrl,
  apiSegment: environment.apiSegment,
  baseApiUrl: `${environment.apiUrl}/${environment.apiSegment}`,
  baseHubUrl: `${environment.apiUrl}/${environment.hubSegment}`,
  siteUrl: environment.siteUrl,
  isDebug: !environment.production
};
