import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { EmployeeSettingsStateService } from '../../../services/states/employee-settings-state.service';

@Component({
  selector: 'aw-employee-settings-details',
  templateUrl: './employee-settings-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    PageBaseComponent,
    PageHeaderComponent
  ]
})
export class EmployeeSettingsDetailsComponent {
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);

  readonly employeeSettings = computed(() => this.employeeSettingsStateService.employeeSettings());
  readonly loadingEmployeeSettings = computed(() => this.employeeSettingsStateService.loadingEmployeeSettings());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly siteUrl = SiteUrl;

  nowWithTimezone = '';
  timezoneInfo: TimeZone | undefined;

  constructor() {
    this.setBreadcrumb();
    this.getCurrentTimezoneInfo();
    this.setNowWithOriginalTimezone();
  }

  getCurrentTimezoneInfo(): void {
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.employeeSettings()?.timezone);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Configuración de empleado', SiteUrl.employeeSettings.settings, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.employeeSettings()?.timezone)
      .toLocaleString(DateTime.TIME_SIMPLE);
  }
}
