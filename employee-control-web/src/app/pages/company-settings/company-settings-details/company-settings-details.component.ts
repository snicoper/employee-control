import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeZone, getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { TableLoadingComponent } from '../../../components/tables/table-loading/table-loading.component';
import { TooltipInfoComponent } from '../../../components/tooltips/tooltip-info/tooltip-info.component';
import { SiteUrls } from '../../../core/urls/site-urls';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { CompanySettingsStateService } from '../../../services/states/company-settings-state.service';
import { WorkingDaysWeekComponent } from './working-days-week/working-days-week.component';

@Component({
  selector: 'aw-company-settings-details',
  templateUrl: './company-settings-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
    TooltipInfoComponent,
    TableLoadingComponent,
    WorkingDaysWeekComponent,
    BoolToIconPipe,
    TooltipDirective
  ]
})
export class CompanySettingsDetailsComponent {
  private readonly companySettingsStateService = inject(CompanySettingsStateService);

  readonly companySettings = computed(() => this.companySettingsStateService.companySettings());
  readonly loadingCompanySettings = computed(() => this.companySettingsStateService.loadingCompanySettings());

  readonly breadcrumb = new BreadcrumbCollection();
  nowWithTimezone = '';
  timezoneInfo: TimeZone | undefined;
  siteUrls = SiteUrls;

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
    this.breadcrumb.add('Configuración', SiteUrls.companySettings.details, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }
}
