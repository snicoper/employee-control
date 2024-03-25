import { Component, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { CurrentCompanySettingsService } from '@aw/services/states/_index';
import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { TableLoadingComponent } from '../../../components/tables/table-loading/table-loading.component';
import { TooltipInfoComponent } from '../../../components/tooltips/tooltip-info/tooltip-info.component';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-company-settings-details',
    templateUrl: './company-settings-details.component.html',
    standalone: true,
    imports: [ViewBaseComponent, ViewHeaderComponent, CardComponent, RouterLink, TooltipInfoComponent, TableLoadingComponent]
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
