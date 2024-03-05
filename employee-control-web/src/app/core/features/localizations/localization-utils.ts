import { LocalesSupported } from './locales-supported';

export abstract class LocalizationUtils {
  static readonly defaultLocale = Intl.DateTimeFormat().resolvedOptions().locale as LocalesSupported;
  static readonly defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  /**
   * Mapea una cultura soportada por un locale de ngx-bootstrap.
   *
   * @see https://valor-software.com/ngx-bootstrap/#/components/datepicker?tab=overview#locales
   * @param locale Una valor de LocalesSupported.
   * @returns Valor de locale en base a LocalesSupported.
   */
  static mapLocaleToNgxBootstrap(locale: LocalesSupported): string {
    switch (locale) {
      case LocalesSupported.es:
      case LocalesSupported.esES:
        return LocalesSupported.es;
      case LocalesSupported.en:
        return LocalesSupported.enUS;
      case LocalesSupported.enUS:
        return LocalesSupported.en;
      default:
        return LocalizationUtils.defaultLocale;
    }
  }
}
