import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badges/badge/badge.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../../components/tables/table/table.component';
import { ApiResult } from '../../../../core/features/api-result/_index';
import { ApiUrls, SiteUrls } from '../../../../core/urls/_index';
import { urlReplaceParams } from '../../../../core/utils/_index';
import { CompanyTask } from '../../../../models/entities/_index';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { CompanyTaskApiService } from '../../../../services/api/_index';
import { EmployeeSelectedService } from '../employee-selected.service';
import { employeeTasksTableHeaders } from './employee-tasks-table-headers';

@Component({
  selector: 'aw-employee-tasks',
  templateUrl: './employee-tasks.component.html',
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
export class EmployeeTasksComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  apiResult = new ApiResult<CompanyTask>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  constructor() {
    this.configureTableHeaders();
    this.loadCompanyTasks();
  }

  handleReloadData(): void {
    this.loadCompanyTasks();
  }

  handleClickClean(event: ApiResult<CompanyTask>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(companyTask: CompanyTask): void {
    const url = urlReplaceParams(SiteUrls.companyTasks.details, { id: companyTask.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(employeeTasksTableHeaders);
  }

  private loadCompanyTasks(): void {
    this.loading = true;

    const url = urlReplaceParams(ApiUrls.companyTasks.getCompanyTasksByEmployeeIdPaginated, {
      employeeId: this.employeeSelected()?.id ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTask>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTask>) => {
          this.apiResult = result;
        }
      });
  }
}
