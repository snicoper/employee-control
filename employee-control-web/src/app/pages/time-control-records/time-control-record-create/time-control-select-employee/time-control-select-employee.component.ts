import { Component, ViewChild, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { TableFilterComponent } from '../../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { TimeControlApiService } from '../../../../services/api/time-control-api.service';
import { TimeControlRecordCreateService } from '../time-control-record-create.service';
import { TimeControlRecordEmployeeResponse } from '../time-control-record-employee-response.model';

@Component({
  selector: 'aw-time-control-select-employee',
  templateUrl: './time-control-select-employee.component.html',
  styleUrl: './time-control-select-employee.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinner,
    BtnBackComponent,
    TableFilterComponent
  ]
})
export class TimeControlSelectEmployeeComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  displayedColumns = ['firstName', 'lastName', 'email'];
  fieldsFilter = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<TimeControlRecordEmployeeResponse, MatPaginator>;
  apiResult = new ApiResult<TimeControlRecordEmployeeResponse>();
  loading = true;

  constructor() {
    this.loadEmployees();
  }

  handleSelectRow(employeeSelected: TimeControlRecordEmployeeResponse): void {
    this.timeControlRecordCreateService.add(employeeSelected);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadEmployees();
  }

  handleFilterChange(apiResult: ApiResult<TimeControlRecordEmployeeResponse>): void {
    this.apiResult = apiResult;
    this.loadEmployees();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult.handleSortChange(sortState);
    this.loadEmployees();
  }

  private loadEmployees(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.employees.getEmployeesPaginated, {
      id: this.timeControlRecordCreateService.employeeSelected()?.id ?? ''
    });

    this.timeControlApiService
      .getPaginated<TimeControlRecordEmployeeResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordEmployeeResponse>) => {
          this.apiResult = ApiResult.clone<TimeControlRecordEmployeeResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
