import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badge/badge.component';
import { TableFilterComponent } from '../../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { Department } from '../../../../models/entities/department.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DepartmentApiService } from './../../../../services/api/department-api.service';
import { EmployeeSelectedService } from './../employee-selected.service';

@Component({
  selector: 'aw-employee-departments',
  templateUrl: './employee-departments.component.html',
  styleUrl: './employee-departments.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BadgeComponent,
    TableFilterComponent,
    BoolToIconPipe
  ]
})
export class EmployeeDepartmentsComponent {
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  displayedColumns = ['name'];
  fieldsFilter = ['name'];
  dataSource!: MatTableDataSource<Department, MatPaginator>;
  apiResult = new ApiResult<Department>();
  loading = true;

  constructor() {
    this.loadCompanyTasks();
  }

  handleSelectRow(department: Department): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.departments.details, { id: department.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadCompanyTasks();
  }

  handleFilterChange(apiResult: ApiResult<Department>): void {
    this.apiResult = apiResult;
    this.loadCompanyTasks();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadCompanyTasks();
  }

  private loadCompanyTasks(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.getDepartmentsByEmployeeIdPaginated, {
      employeeId: this.employeeSelected()?.id ?? ''
    });

    this.departmentApiService
      .getPaginated<Department>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<Department>) => {
          this.apiResult = ApiResult.clone<Department>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
