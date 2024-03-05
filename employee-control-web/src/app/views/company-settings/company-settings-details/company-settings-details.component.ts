import { Component, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { CurrentCompanySettingsService } from '@aw/services/states/_index';
import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';

@Component({
  selector: 'aw-company-settings-details',
  templateUrl: './company-settings-details.component.html'
})
export class CompanySettingsDetailsComponent {
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);

  readonly companySettings = computed(() => this.currentCompanySettingsService.companySettings());
  readonly loadingCompanySettings = computed(() => this.currentCompanySettingsService.loadingCompanySettings());

  readonly breadcrumb = new BreadcrumbCollection();
  nowWithTimezone = '';
  timezoneInfo: TimeZone | undefined;
  siteUrls = SiteUrls;

  constructor() {
    this.setBreadcrumb();
    this.getCurrentTimezoneInfo();
    this.setNowWithOriginalTimezone();
  }

  getCurrentTimezoneInfo(): void {
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.companySettings()?.timezone);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Configuración', SiteUrls.companySettings.details, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }
}
