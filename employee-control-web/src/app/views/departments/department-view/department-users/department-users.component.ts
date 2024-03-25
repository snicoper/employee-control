import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { DepartmentApiService } from '@aw/services/api/department-api.service';
import { finalize } from 'rxjs';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../../components/tables/table-header/table-header.component';
import { TableInputSearchComponent } from '../../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../../components/tables/table/table.component';
import { DepartmentSelectedService } from '../department-selected.service';
import { DepartmentUserResponse } from './department-users-response.model';
import { departmentUsersTableHeaders } from './department-users-table-headers';

@Component({
  selector: 'aw-department-users',
  templateUrl: './department-users.component.html',
  standalone: true,
  imports: [TableInputSearchComponent, TableComponent, TableHeaderComponent, PaginationComponent]
})
export class DepartmentUsersComponent {
  @Output() changeComponent = new EventEmitter();

  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly router = inject(Router);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());

  apiResult = new ApiResult<DepartmentUserResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  constructor() {
    this.configureTableHeaders();
    this.loadCompanyTaskUsers();
  }

  handleChangeComponent(): void {
    this.changeComponent.emit();
  }

  handleReloadData(): void {
    this.loadCompanyTaskUsers();
  }

  handleClickClean(event: ApiResult<DepartmentUserResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(departmentUser: DepartmentUserResponse): void {
    const url = urlReplaceParams(SiteUrls.employees.details, { id: departmentUser.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(departmentUsersTableHeaders);
  }

  private loadCompanyTaskUsers(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.departments.getEmployeesByCompanyIdPaginated, {
      id: this.departmentSelectedService.departmentSelected()?.id ?? ''
    });

    this.departmentApiService
      .getPaginated<DepartmentUserResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<DepartmentUserResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
