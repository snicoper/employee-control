import { Component, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { HolidayAssignResponse } from './holidays-assign.response';

@Component({
  selector: 'aw-holidays-assign',
  templateUrl: './holidays-assign.component.html',
  styleUrl: './holidays-assign.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    PageBaseComponent,
    PageHeaderComponent,
    YearSelectorComponent,
    TableFilterComponent
  ]
})
export class HolidaysAssignComponent {
  private readonly employeesApiService = inject(EmployeesApiService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['firstName', 'lastName', 'email'];
  fieldsFilter = ['firstName', 'lastName', 'email'];
  readonly breadcrumb = new BreadcrumbCollection();
  readonly siteUrl = SiteUrl;

  dataSource!: MatTableDataSource<HolidayAssignResponse>;
  apiResult = new ApiResult<HolidayAssignResponse>();
  loading = true;
  yearSelected = DateTime.local();

  constructor() {
    this.setBreadcrumb();
    this.loadEmployees();
  }

  handleYearSelectorChange(year: DateTime): void {
    this.yearSelected = year;
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);
    this.loadEmployees();
  }

  handleFilterChange(apiResult: ApiResult<HolidayAssignResponse>): void {
    this.apiResult = apiResult;
    this.loadEmployees();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadEmployees();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Pendientes', SiteUrl.manageHolidays.claims, '', true)
      .add('Asignar', SiteUrl.manageHolidays.assigned, '', false);
  }

  private loadEmployees(): void {
    this.employeesApiService
      .getPaginated<HolidayAssignResponse>(this.apiResult, ApiUrl.employees.getEmployeesPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<HolidayAssignResponse>) => {
          this.apiResult = ApiResult.clone<HolidayAssignResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
