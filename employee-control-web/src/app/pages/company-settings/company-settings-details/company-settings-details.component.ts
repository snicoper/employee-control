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
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { CompanySettingsStateService } from '../../../services/states/company-settings-state.service';
import { WorkingDaysWeekComponent } from './working-days-week/working-days-week.component';

@Component({
  selector: 'aw-company-settings-details',
  templateUrl: './company-settings-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    PageBaseComponent,
    PageHeaderComponent,
    WorkingDaysWeekComponent,
    BoolToIconPipe
  ]
})
export class CompanySettingsDetailsComponent {
  private readonly companySettingsStateService = inject(CompanySettingsStateService);

  readonly companySettings = computed(() => this.companySettingsStateService.companySettings());
  readonly loadingCompanySettings = computed(() => this.companySettingsStateService.loadingCompanySettings());

  readonly breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;

  nowWithTimezone = '';
  timezoneInfo: TimeZone | undefined;

  constructor() {
    this.setBreadcrumb();
    this.getCurrentTimezoneInfo();
    this.setNowWithOriginalTimezone();
  }

  get requiredGeolocation(): string {
    return this.companySettings()?.geolocationRequired ? 'Requerida' : 'No requerida';
  }

  getCurrentTimezoneInfo(): void {
    this.timezoneInfo = getTimeZones().find((tz) => tz.name === this.companySettings()?.timezone);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Configuración', SiteUrl.companySettings.details, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_SIMPLE);
  }
}
