import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../../components/tables/table/table.component';
import { ApiResult } from '../../../../core/features/api-result/api-result';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../../core/utils/common-utils';
import { CompanyTaskApiService } from '../../../../services/api/company-task-api.service';
import { CompanyTaskSelectedService } from '../company-task-selected.service';
import { CompanyTaskUserResponse } from './company-task-users-response.model';
import { companyTaskUsersTableHeaders } from './company-task-users-table-headers';

@Component({
  selector: 'aw-company-task-users',
  templateUrl: './company-task-users.component.html',
  standalone: true,
  imports: [TableInputSearchComponent, TableComponent, TableHeaderComponent, PaginationComponent]
})
export class CompanyTaskUsersComponent {
  @Output() changeComponent = new EventEmitter();

  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);
  private readonly router = inject(Router);

  readonly companyTaskSelected = computed(() => this.companyTaskSelectedService.companyTaskSelected());

  apiResult = new ApiResult<CompanyTaskUserResponse>();
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

  handleClickClean(event: ApiResult<CompanyTaskUserResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(companyTaskUser: CompanyTaskUserResponse): void {
    const url = urlReplaceParams(SiteUrls.employees.details, { id: companyTaskUser.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(companyTaskUsersTableHeaders);
  }

  private loadCompanyTaskUsers(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.companyTasks.getEmployeesByCompanyTaskIdPaginated, {
      id: this.companyTaskSelectedService.companyTaskSelected()?.id ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTaskUserResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTaskUserResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
