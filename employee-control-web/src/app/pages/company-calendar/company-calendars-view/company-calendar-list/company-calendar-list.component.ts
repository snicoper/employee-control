import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { PageBaseComponent } from '../../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../../components/pages/page-header/page-header.component';
import { TableFilterComponent } from '../../../../components/tables/table-filter/table-filter.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { CompanyCalendar } from '../../../../models/entities/company-calendar.model';
import { CompanyCalendarsApiService } from '../../../../services/api/company-calendars-api.service';

@Component({
  selector: 'aw-company-calendar-list',
  templateUrl: './company-calendar-list.component.html',
  styleUrl: './company-calendar-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    TableFilterComponent,
    BtnBackComponent
  ]
})
export class CompanyCalendarListComponent {
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);
  private readonly router = inject(Router);

  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();
  readonly displayedColumns = ['name', 'description', 'default'];
  readonly siteUrl = SiteUrl;

  dataSource!: MatTableDataSource<CompanyCalendar>;
  apiResult: Array<CompanyCalendar> = [];
  loading = true;

  constructor() {
    this.setBreadcrumb();
    this.loadCompanyCalendars();
  }

  handleSelectRow(companyCalendar: CompanyCalendar): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.companyCalendar.details, { id: companyCalendar.id });
    this.router.navigateByUrl(url);
  }

  handleSortChange(): void {
    this.dataSource.sort = this.sort;
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Calendarios', SiteUrl.companyCalendar.calendar, '')
      .add('Lista de calendarios', SiteUrl.companyCalendar.list, '', false);
  }

  private loadCompanyCalendars(): void {
    this.companyCalendarsApiService
      .get<Array<CompanyCalendar>>(ApiUrl.companyCalendar.getCompanyCalendars)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: Array<CompanyCalendar>) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
