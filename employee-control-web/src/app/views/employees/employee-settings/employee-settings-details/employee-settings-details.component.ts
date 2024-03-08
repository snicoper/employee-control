import { Component, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { EmployeeSettingsService } from '@aw/services/states/_index';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';

@Component({
  selector: 'aw-employee-settings-details',
  templateUrl: './employee-settings-details.component.html'
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
