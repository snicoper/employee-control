import { Component, ViewChild, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { EmployeeSelectedService } from '../employee-view/employee-selected.service';
import { EmployeeListResponse } from './employee-list-response.model';

@Component({
  selector: 'aw-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinner,
    PageBaseComponent,
    PageHeaderComponent,
    TableFilterComponent,
    BoolToIconPipe
  ]
})
export class EmployeeListComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();

  displayedColumns = ['firstName', 'lastName', 'email', 'active', 'emailConfirmed'];
  fieldsFilter = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<EmployeeListResponse, MatPaginator>;
  apiResult = new ApiResult<EmployeeListResponse>();
  loading = true;
  siteUrl = SiteUrl;

  constructor() {
    this.employeeSelectedService.clean();
    this.setBreadcrumb();
    this.loadEmployees();
  }

  handleSelectRow(employee: EmployeeListResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: employee.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadEmployees();
  }

  handleFilterChange(apiResult: ApiResult<EmployeeListResponse>): void {
    this.apiResult = apiResult;
    this.loadEmployees();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult.handleSortChange(sortState);
    this.loadEmployees();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Empleados', SiteUrl.employees.list, '', false);
  }

  private loadEmployees(): void {
    this.employeesApiService
      .getPaginated<EmployeeListResponse>(this.apiResult, ApiUrl.employees.getEmployeesPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<EmployeeListResponse>) => {
          this.apiResult = ApiResult.clone<EmployeeListResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
