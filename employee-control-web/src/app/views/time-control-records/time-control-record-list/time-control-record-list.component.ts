import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { logError } from '@aw/core/errors/_index';
import { LogicalOperators, OrderTypes, RelationalOperators } from '@aw/core/features/api-result/_index';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { ResultResponse } from '@aw/models/_index';
import { TimeState } from '@aw/models/entities/types/_index';
import { ClosedBy } from '@aw/models/entities/types/closed-by.model';
import { TimeControlApiService } from '@aw/services/api/_index';
import { JwtService } from '@aw/services/jwt.service';
import { SimpleGeolocationService } from '@aw/services/simple-geolocation.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlRecordResponse } from './time-contol-record-esponse.model';
import { timeControlRecordListTableHeaders } from './time-control-record-list-table-header';

@Component({
  selector: 'aw-time-control-record-list',
  templateUrl: './time-control-record-list.component.html'
})
export class TimeControlRecordListComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
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

  handleCloseTimeControl(timeControl: TimeControlRecordResponse): void {
    this.loadingTimeState = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .post<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControlByStaff)
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
    this.breadcrumb.add('Registro de tiempos', SiteUrls.timeControl.home, '', false);
  }

  private loadTimeControlRecords(): void {
    this.loading = false;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimesControlByCompanyIdPaginated, {
      companyId: this.jwtService.getCompanyId(),
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
