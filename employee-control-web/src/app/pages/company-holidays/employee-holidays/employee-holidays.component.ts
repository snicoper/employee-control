import { NgClass } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { YearSelectorComponent } from '../../../components/selectors/year-selector/year-selector.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { EmployeeHolidaysApiService } from '../../../services/api/employee-holidays-api.service';
import { CompanyHolidaysHeadersComponent } from '../company-holidays-headers/company-holidays-headers.component';
import { EmployeeHolidaysResponse } from './employee-holidays-response.model';

@Component({
  selector: 'aw-employee-holidays',
  templateUrl: './employee-holidays.component.html',
  styleUrl: './employee-holidays.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    TableFilterComponent,
    YearSelectorComponent,
    CompanyHolidaysHeadersComponent
  ]
})
export class EmployeeHolidaysComponent {
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();
  readonly displayedColumns = ['firstName', 'lastName', 'email', 'totalDays', 'consumed', 'remaining'];
  readonly fieldsFilter = ['firstName', 'lastName', 'email'];
  readonly siteUrl = SiteUrl;

  dataSource!: MatTableDataSource<EmployeeHolidaysResponse>;
  apiResult = new ApiResult<EmployeeHolidaysResponse>();
  loading = true;
  yearSelected = DateTime.local();

  constructor() {
    this.setBreadcrumb();
    this.loadEmployeeHolidays();
  }

  handleYearSelectorChange(year: DateTime): void {
    this.yearSelected = year;
    this.loadEmployeeHolidays();
  }

  handleSelectRow(employeeHolidayResponse: EmployeeHolidaysResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.companyHolidays.details, {
      year: String(this.yearSelected.year),
      employeeId: employeeHolidayResponse.userId
    });

    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);
    this.loadEmployeeHolidays();
  }

  handleFilterChange(apiResult: ApiResult<EmployeeHolidaysResponse>): void {
    this.apiResult = apiResult;
    this.loadEmployeeHolidays();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadEmployeeHolidays();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Vacaciones de empelados', SiteUrl.companyHolidays.employees, '', false);
  }

  private loadEmployeeHolidays(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.employeeHolidays.getEmployeeHolidaysByYearPaginated, {
      year: String(this.yearSelected.year)
    });

    this.employeeHolidaysApiService
      .getPaginated<EmployeeHolidaysResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<EmployeeHolidaysResponse>) => {
          this.apiResult = ApiResult.clone<EmployeeHolidaysResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
