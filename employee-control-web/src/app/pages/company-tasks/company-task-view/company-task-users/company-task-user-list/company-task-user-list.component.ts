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
import { CompanyTaskApiService } from '../../../../../services/api/company-task-api.service';
import { CompanyTaskViewService } from '../../company-task-view.service';
import { CompanyTaskUserResponse } from '../company-task-users-response.model';

@Component({
  selector: 'aw-company-task-user-list',
  templateUrl: './company-task-user-list.component.html',
  styleUrl: './company-task-user-list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButton, MatSortModule, MatPaginator, MatProgressSpinner, TableFilterComponent]
})
export class CompanyTaskUserListComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly companyTaskViewService = inject(CompanyTaskViewService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly tabSelected = computed(() => this.companyTaskViewService.tabSelected());

  displayedColumns = ['firstName', 'lastName', 'email'];
  fieldsFilter = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<CompanyTaskUserResponse, MatPaginator>;
  apiResult = new ApiResult<CompanyTaskUserResponse>();
  loading = true;

  constructor() {
    this.addListeners();
  }

  handleSelectRow(companyTaskUser: CompanyTaskUserResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: companyTaskUser.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadCompanyTaskUsers();
  }

  handleFilterChange(apiResult: ApiResult<CompanyTaskUserResponse>): void {
    this.apiResult = apiResult;
    this.loadCompanyTaskUsers();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadCompanyTaskUsers();
  }

  private loadCompanyTaskUsers(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.getEmployeesByCompanyTaskIdPaginated, {
      id: this.companyTaskViewService.companyTaskSelected()?.id ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTaskUserResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTaskUserResponse>) => {
          this.apiResult = ApiResult.clone<CompanyTaskUserResponse>(result);
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
