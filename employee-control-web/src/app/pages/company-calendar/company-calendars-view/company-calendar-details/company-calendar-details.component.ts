import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { PageBaseComponent } from '../../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { CompanyCalendar } from '../../../../models/entities/company-calendar.model';
import { ResultResponse } from '../../../../models/result-response.model';
import { CompanyCalendarsApiService } from '../../../../services/api/company-calendars-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'aw-company-calendar-details',
  templateUrl: './company-calendar-details.component.html',
  styleUrl: './company-calendar-details.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    PageBaseComponent,
    PageHeaderComponent,
    BtnBackComponent
  ]
})
export class CompanyCalendarDetailsComponent {
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private snackBarService = inject(SnackBarService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyCalendarId: string;

  companyCalendar!: CompanyCalendar;
  loadingCompanyCalendar = true;

  constructor() {
    this.companyCalendarId = this.route.snapshot.paramMap.get('id') as string;
    this.setBreadcrumb();
    this.loadCompanyCalendar();
  }

  handleSetDefaultCalendar(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyCalendar.setDefaultCalendar, { id: this.companyCalendarId });
    this.companyCalendarsApiService.put<string, ResultResponse>(this.companyCalendarId, url).subscribe({
      next: () => {
        this.snackBarService.success('Calendario establecido por defecto con éxito.');
        this.loadCompanyCalendar();
      }
    });
  }

  handleClickUpdate(): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.companyCalendar.update, { id: this.companyCalendarId });
    this.router.navigateByUrl(url);
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Calendarios', SiteUrl.companyCalendar.calendar, '')
      .add('Lista de calendarios', SiteUrl.companyCalendar.list, '')
      .add('Detalles', SiteUrl.companyCalendar.details, '', false);
  }

  private loadCompanyCalendar(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyCalendar.getCompanyCalendarById, {
      id: this.companyCalendarId
    });

    this.companyCalendarsApiService
      .get<CompanyCalendar>(url)
      .pipe(finalize(() => (this.loadingCompanyCalendar = false)))
      .subscribe({
        next: (result: CompanyCalendar) => {
          this.companyCalendar = result;
        }
      });
  }
}
