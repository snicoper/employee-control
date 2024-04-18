import { Component, ViewChild, computed, effect, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableFilterComponent } from '../../../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../../core/utils/common-utils';
import { DepartmentApiService } from '../../../../../services/api/department-api.service';
import { DepartmentSelectedService } from '../../department-selected.service';
import { DepartmentUserResponse } from '../department-users-response.model';

@Component({
  selector: 'aw-department-user-list',
  templateUrl: './department-user-list.component.html',
  styleUrl: './department-user-list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButton, MatSortModule, MatPaginator, MatProgressSpinner, TableFilterComponent]
})
export class DepartmentUserListComponent {
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly tabSelected = computed(() => this.departmentSelectedService.tabSelected());

  displayedColumns = ['firstName', 'lastName', 'email'];
  fieldsFilter = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<DepartmentUserResponse, MatPaginator>;
  apiResult = new ApiResult<DepartmentUserResponse>();
  loading = true;

  constructor() {
    this.addListeners();
  }

  handleSelectRow(departmentUser: DepartmentUserResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: departmentUser.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadCompanyTaskUsers();
  }

  handleFilterChange(apiResult: ApiResult<DepartmentUserResponse>): void {
    this.apiResult = apiResult;
    this.loadCompanyTaskUsers();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadCompanyTaskUsers();
  }

  private loadCompanyTaskUsers(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.getEmployeesByCompanyIdPaginated, {
      id: this.departmentSelectedService.departmentSelected()?.id ?? ''
    });

    this.departmentApiService
      .getPaginated<DepartmentUserResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<DepartmentUserResponse>) => {
          this.apiResult = ApiResult.clone<DepartmentUserResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }

  private addListeners(): void {
    effect(() => {
      if (this.tabSelected() === 'user-list') {
        this.loadCompanyTaskUsers();
      }
    });
  }
}
