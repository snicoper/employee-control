import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badges/badge/badge.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../../components/tables/table/table.component';
import { ApiResult } from '../../../../core/features/api-result/api-result';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../../core/utils/common-utils';
import { Department } from '../../../../models/entities/department.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DepartmentApiService } from './../../../../services/api/department-api.service';
import { EmployeeSelectedService } from './../employee-selected.service';
import { employeeDepartmentsTableHeaders } from './employee-departments-table-headers';

@Component({
  selector: 'aw-employee-departments',
  templateUrl: './employee-departments.component.html',
  standalone: true,
  imports: [
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    BadgeComponent,
    PaginationComponent,
    BoolToIconPipe
  ]
})
export class EmployeeDepartmentsComponent {
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  apiResult = new ApiResult<Department>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  constructor() {
    this.configureTableHeaders();
    this.loadCompanyTasks();
  }

  handleReloadData(): void {
    this.loadCompanyTasks();
  }

  handleClickClean(event: ApiResult<Department>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(department: Department): void {
    const url = urlReplaceParams(SiteUrls.departments.details, { id: department.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(employeeDepartmentsTableHeaders);
  }

  private loadCompanyTasks(): void {
    this.loading = true;

    const url = urlReplaceParams(ApiUrls.departments.getDepartmentsByEmployeeIdPaginated, {
      employeeId: this.employeeSelected()?.id ?? ''
    });

    this.departmentApiService
      .getPaginated<Department>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<Department>) => {
          this.apiResult = result;
        }
      });
  }
}
