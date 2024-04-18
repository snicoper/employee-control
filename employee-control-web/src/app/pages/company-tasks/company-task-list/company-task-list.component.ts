import { DatePipe } from '@angular/common';
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
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { CompanyTask } from '../../../models/entities/company-task.model';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { DatetimePipe } from '../../../pipes/datetime.pipe';
import { CompanyTaskApiService } from '../../../services/api/company-task-api.service';

@Component({
  selector: 'aw-company-tasks-list',
  templateUrl: './company-task-list.component.html',
  styleUrl: './company-task-list.component.scss',
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
    BadgeComponent,
    DotComponent,
    BoolToIconPipe,
    DatetimePipe,
    DatePipe
  ]
})
export class CompanyTaskListComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();

  displayedColumns = ['name', 'created', 'active', 'background', 'color'];
  fieldsFilter = ['name'];
  dataSource!: MatTableDataSource<CompanyTask, MatPaginator>;
  apiResult = new ApiResult<CompanyTask>();
  loading = true;
  siteUrl = SiteUrl;

  constructor() {
    this.setBreadcrumb();
    this.loadCompanyTasks();
  }

  handleSelectRow(companyTask: CompanyTask): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.companyTasks.details, { id: companyTask.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadCompanyTasks();
  }

  handleFilterChange(apiResult: ApiResult<CompanyTask>): void {
    this.apiResult = apiResult;
    this.loadCompanyTasks();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult = this.apiResult.handleSortChange(sortState);
    this.loadCompanyTasks();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrl.companyTasks.list, '', false);
  }

  private loadCompanyTasks(): void {
    this.companyTaskApiService
      .getPaginated<CompanyTask>(this.apiResult, ApiUrl.companyTasks.getCompanyTasksPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CompanyTask>) => {
          this.apiResult = ApiResult.clone<CompanyTask>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
