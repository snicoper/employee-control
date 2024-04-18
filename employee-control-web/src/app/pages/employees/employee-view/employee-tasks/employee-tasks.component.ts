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
import { CompanyTask } from '../../../../models/entities/company-task.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { CompanyTaskApiService } from '../../../../services/api/company-task-api.service';
import { EmployeeSelectedService } from '../employee-selected.service';

@Component({
  selector: 'aw-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrl: './employee-tasks.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    TableFilterComponent,
    BadgeComponent,
    BoolToIconPipe
  ]
})
export class EmployeeTasksComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  displayedColumns = ['name'];
  fieldsFilter = ['name'];
  dataSource!: MatTableDataSource<CompanyTask, MatPaginator>;
  apiResult = new ApiResult<CompanyTask>();
  loading = true;

  constructor() {
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

  private loadCompanyTasks(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.getCompanyTasksByEmployeeIdPaginated, {
      employeeId: this.employeeSelected()?.id ?? ''
    });

    this.companyTaskApiService
      .getPaginated<CompanyTask>(this.apiResult, url)
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
