import { Component, computed, inject } from '@angular/core';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/_index';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { TimeControlApiService } from '@aw/services/api/time-control-api.service';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../../components/tables/table-header/table-header.component';
import { TableInputSearchComponent } from '../../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../../components/tables/table/table.component';
import { TimeControlRecordCreateService } from '../time-control-record-create.service';
import { TimeControlRecordEmployeeResponse } from '../time-control-record-employee-response.model';
import { timeControlRecordEmployeeTableHeaders } from './time-control-record-employee-table-headers';

@Component({
  selector: 'aw-time-control-select-employee',
  templateUrl: './time-control-select-employee.component.html',
  standalone: true,
  imports: [TableInputSearchComponent, TableComponent, TableHeaderComponent, PaginationComponent, BtnBackComponent]
})
export class TimeControlSelectEmployeeComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);

  readonly employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  apiResult = new ApiResult<TimeControlRecordEmployeeResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;

  constructor() {
    this.configureTableHeaders();
    this.loadEmployees();
  }

  handleReloadData(): void {
    this.loadEmployees();
  }

  handleClickClean(event: ApiResult<TimeControlRecordEmployeeResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(employeeSelected: TimeControlRecordEmployeeResponse): void {
    this.timeControlRecordCreateService.add(employeeSelected);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(timeControlRecordEmployeeTableHeaders);
  }

  private loadEmployees(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.employees.getEmployeesPaginated, {
      id: this.timeControlRecordCreateService.employeeSelected()?.id ?? ''
    });

    this.timeControlApiService
      .getPaginated<TimeControlRecordEmployeeResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordEmployeeResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
