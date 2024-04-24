import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
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
import { HolidayAssignedResponse } from './holidays-assigned.response';

@Component({
  selector: 'aw-holidays-assigned',
  templateUrl: './holidays-assigned.component.html',
  styleUrl: './holidays-assigned.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    PageBaseComponent,
    PageHeaderComponent,
    TableFilterComponent,
    YearSelectorComponent
  ]
})
export class HolidaysAssignedComponent {
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();
  readonly displayedColumns = ['firstName', 'lastName', 'email', 'totalDays', 'consumed', 'remaining'];
  readonly fieldsFilter = ['user.firstName', 'user.lastName', 'user.email', 'totalDays', 'consumed'];
  readonly siteUrl = SiteUrl;

  dataSource!: MatTableDataSource<HolidayAssignedResponse>;
  apiResult = new ApiResult<HolidayAssignedResponse>();
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

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);
    this.loadEmployeeHolidays();
  }

  handleFilterChange(apiResult: ApiResult<HolidayAssignedResponse>): void {
    this.apiResult = apiResult;
    this.loadEmployeeHolidays();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadEmployeeHolidays();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Días festivos', SiteUrl.manageHolidays.assigned, '', false);
  }

  private loadEmployeeHolidays(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.employeeHolidays.getEmployeeHolidaysByYearPaginated, {
      year: String(this.yearSelected.year)
    });

    this.employeeHolidaysApiService
      .getPaginated<HolidayAssignedResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<HolidayAssignedResponse>) => {
          this.apiResult = ApiResult.clone<HolidayAssignedResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
