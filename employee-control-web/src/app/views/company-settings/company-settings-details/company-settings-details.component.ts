import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { TableLoadingComponent } from '../../../components/tables/table-loading/table-loading.component';
import { TooltipInfoComponent } from '../../../components/tooltips/tooltip-info/tooltip-info.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { SiteUrls } from '../../../core/urls/_index';
import { CurrentCompanySettingsStateService } from '../../../services/states/_index';
import { WorkingDaysWeekComponent } from '../working-days-week/working-days-week.component';

@Component({
  selector: 'aw-company-settings-details',
  templateUrl: './company-settings-details.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TooltipInfoComponent,
    TableLoadingComponent,
    WorkingDaysWeekComponent
  ]
})
export class CompanySettingsDetailsComponent {
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);

  readonly companySettings = computed(() => this.currentCompanySettingsStateService.companySettings());
  readonly loadingCompanySettings = computed(() => this.currentCompanySettingsStateService.loadingCompanySettings());

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
