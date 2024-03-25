import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { EmployeeSettingsService } from '@aw/services/states/_index';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { TableLoadingComponent } from '../../../../components/tables/table-loading/table-loading.component';
import { TooltipInfoComponent } from '../../../../components/tooltips/tooltip-info/tooltip-info.component';
import { ViewBaseComponent } from '../../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../../components/views/view-header/view-header.component';

@Component({
  selector: 'aw-employee-settings-details',
  templateUrl: './employee-settings-details.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TooltipInfoComponent,
    TableLoadingComponent
  ]
})
export class EmployeeSettingsDetailsComponent {
  private readonly employeeSettingsService = inject(EmployeeSettingsService);

  readonly employeeSettings = computed(() => this.employeeSettingsService.employeeSettings());
  readonly loadingEmployeeSettings = computed(() => this.employeeSettingsService.loadingEmployeeSettings());

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
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.employeeSettings()?.timezone);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Configuración de empleado', SiteUrls.employees.settings, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.employeeSettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }
}
