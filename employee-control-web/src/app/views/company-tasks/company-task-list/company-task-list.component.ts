import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiResult } from '../../../core/features/api-result/_index';
import { ApiUrls, SiteUrls } from '../../../core/urls/_index';
import { urlReplaceParams } from '../../../core/utils/_index';
import { CompanyTask } from '../../../models/entities/_index';
import { BoolToIconPipe, DatetimePipe } from '../../../pipes/_index';
import { CompanyTaskApiService } from '../../../services/api/_index';
import { CurrentCompanyEmployeeService } from '../../../services/states/_index';
import { companyTaskListTableHeader } from './company-task-list-table-headers';

@Component({
  selector: 'aw-company-tasks-list',
  templateUrl: './company-task-list.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    BadgeComponent,
    DotComponent,
    PaginationComponent,
    BoolToIconPipe,
    DatetimePipe
  ]
})
export class CompanyTaskListComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly router = inject(Router);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<CompanyTask>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;
  dateShort = DateTime.DATE_SHORT;

  constructor() {
    this.configureTableHeaders();
    this.setBreadcrumb();
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
    const url = urlReplaceParams(SiteUrls.companyTasks.details, { id: companyTask.id.toString() });
    this.router.navigateByUrl(url);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrls.companyTasks.list, '', false);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(companyTaskListTableHeader);
  }

  private loadCompanyTasks(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.companyTasks.getCompanyTasksByCompanyIdPaginated, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id.toString() ?? ''
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
