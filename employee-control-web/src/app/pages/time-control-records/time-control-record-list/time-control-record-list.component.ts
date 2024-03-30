import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { logError } from '../../../core/errors/log-messages';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { LogicalOperators } from '../../../core/features/api-result/types/logical-operator';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';
import { RelationalOperators } from '../../../core/features/api-result/types/relational-operator';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { TimeState } from '../../../models/entities/types/time-state.model';
import { ResultResponse } from '../../../models/result-response.model';
import { ClosedByPipe } from '../../../pipes/closed-by.pipe';
import { DatetimePipe } from '../../../pipes/datetime.pipe';
import { DeviceTypePipe } from '../../../pipes/device-type.pipe';
import { DurationToTimePipe } from '../../../pipes/duration-to-time.pipe';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { SimpleGeolocationService } from '../../../services/simple-geolocation.service';
import { TimeControlRecordResponse } from './time-contol-record-response.model';
import { timeControlRecordListTableHeaders } from './time-control-record-list-table-header';

@Component({
  selector: 'aw-time-control-record-list',
  templateUrl: './time-control-record-list.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
    RouterLink,
    NgClass,
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    TooltipDirective,
    DotSuccessComponent,
    DotDangerComponent,
    PaginationComponent,
    DatetimePipe,
    ClosedByPipe,
    DurationToTimePipe,
    DeviceTypePipe
  ]
})
export class TimeControlRecordListComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<TimeControlRecordResponse>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;
  timeState = TimeState;
  closedBy = ClosedBy;
  from?: Date | string = 'null';
  to?: Date | string = 'null';
  loadingTimeState = false;
  bsModalRef?: BsModalRef;
  filterOpenTimesValue = false;

  constructor() {
    this.apiResult.addOrder('start', OrderTypes.ascending, 1);

    this.configureTableHeaders();
    this.setBreadcrumb();
    this.loadTimeControlRecords();
  }

  getStartOpenStreetMapLink(timeControl: TimeControlRecordResponse): string | null {
    if (timeControl.latitudeStart && timeControl.longitudeStart) {
      return this.simpleGeolocationService.getOpenStreetMapLink(timeControl.latitudeStart, timeControl.longitudeStart);
    }

    return null;
  }

  getFinishOpenStreetMapLink(timeControl: TimeControlRecordResponse): string | null {
    if (timeControl.latitudeFinish && timeControl.longitudeFinish) {
      return this.simpleGeolocationService.getOpenStreetMapLink(
        timeControl.latitudeFinish,
        timeControl.longitudeFinish
      );
    }

    return null;
  }

  handleFilterOpenTimesChange(): void {
    this.filterOpenTimesValue = !this.filterOpenTimesValue;
    this.handleClickClean(this.apiResult);
    this.loadTimeControlRecords();
  }

  handleTimeControlUpdate(timeControl: TimeControlRecordResponse): void {
    const url = urlReplaceParams(SiteUrls.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleReloadData(): void {
    this.loadTimeControlRecords();
  }

  handleDetailsTimeControl(timeControl: TimeControlRecordResponse): void {
    const url = urlReplaceParams(SiteUrls.timeControlRecords.details, { id: timeControl.id });

    this.router.navigateByUrl(url);
  }

  handleCloseTimeControl(timeControl: TimeControlRecordResponse): void {
    this.loadingTimeState = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.loadTimeControlRecords();
            this.toastrService.success('Tiempo finalizado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleDeleteTimeControl(timeControl: TimeControlRecordResponse): void {
    const url = urlReplaceParams(ApiUrls.timeControl.deleteTimeControl, { id: timeControl.id });

    this.timeControlApiService.delete<ResultResponse>(url).subscribe({
      next: (result: ResultResponse) => {
        if (result.succeeded) {
          this.loadTimeControlRecords();
          this.toastrService.success('Tiempo eliminado con éxito.');
        } else {
          this.toastrService.error('Ha ocurrido un error al eliminar el tiempo.');
          logError(result.errors.join());
        }
      }
    });
  }

  handleClickClean(event: ApiResult<TimeControlRecordResponse>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(timeControlRecordListTableHeaders);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Registro de tiempos', SiteUrls.timeControlRecords.list, '', false);
  }

  private loadTimeControlRecords(): void {
    this.loading = false;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimesControlByRangePaginated, {
      from: this.from as string,
      to: this.to as string
    });

    this.apiResult = ApiResult.clone(this.apiResult);
    this.apiResult.removeFilterByPropertyName('timeState');

    if (this.filterOpenTimesValue) {
      this.apiResult.addFilter(
        'timeState',
        RelationalOperators.equalTo,
        TimeState.open.toString(),
        this.apiResult.filters.length === 0 ? LogicalOperators.none : LogicalOperators.and
      );
    }

    this.timeControlApiService
      .getPaginated<TimeControlRecordResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordResponse>) => {
          this.apiResult = result;
        }
      });
  }
}
