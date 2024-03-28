import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { EmployeeListResponse } from './employee-list-response.model';
import { employeeListTableHeaders } from './employee-list-table-headers';

@Component({
  selector: 'aw-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    PaginationComponent,
    BoolToIconPipe
  ]
})
export class EmployeeListComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<EmployeeListResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.configureTableHeaders();
    this.setBreadcrumb();
    this.loadEmployees();
  }

  handleReloadData(): void {
    this.loadEmployees();
  }

  handleClickClean(event: ApiResult<EmployeeListResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(employee: EmployeeListResponse): void {
    const url = urlReplaceParams(SiteUrls.employees.details, { id: employee.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(employeeListTableHeaders);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Empleados', SiteUrls.employees.list, '', false);
  }

  private loadEmployees(): void {
    this.loading = true;
    this.employeesApiService
      .getPaginated<EmployeeListResponse>(this.apiResult, ApiUrls.employees.getEmployeesPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<EmployeeListResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
