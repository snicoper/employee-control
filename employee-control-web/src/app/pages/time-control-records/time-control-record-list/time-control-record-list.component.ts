import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { DateRangeSelectorComponent } from '../../../components/selectors/date-range-selector/date-range-selector.component';
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
import { CommonUtils } from '../../../core/utils/common-utils';
import { DatetimeUtils } from '../../../core/utils/datetime-utils';
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
    NgClass,
    RouterLink,
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    TooltipDirective,
    DotSuccessComponent,
    DotDangerComponent,
    PaginationComponent,
    DateRangeSelectorComponent,
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
  from: Date = new Date();
  to: Date = new Date();
  loadingTimeState = false;

  /** Custom filters. */
  filterOpenTimesValue = false;
  filterIncidences = false;
  filterStateDateRange = true;

  constructor() {
    this.apiResult.addOrder('start', OrderTypes.ascending, 1);

    this.configureTableHeaders();
    this.setBreadcrumb();

    // El seteo de datos, el componente aw-date-range-selector hará un emit y cargara los datos.
    this.from.setDate(this.from.getDate() - 7);
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
    this.filterIncidences = false;

    this.loadTimeControlRecords();
  }

  handleFilterIncidencesChange(): void {
    this.filterIncidences = !this.filterIncidences;
    this.filterOpenTimesValue = false;

    this.loadTimeControlRecords();
  }

  handleTimeControlUpdate(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrls.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleReloadData(): void {
    this.loadTimeControlRecords();
  }

  handleDetailsTimeControl(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrls.timeControlRecords.details, { id: timeControl.id });

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
    const url = CommonUtils.urlReplaceParams(ApiUrls.timeControl.deleteTimeControl, { id: timeControl.id });

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

  handleDateRangeValueChange(value: (Date | undefined)[] | undefined): void {
    this.from = new Date();
    this.to = new Date();

    if (value && value.length === 2) {
      this.from = value[0] as Date;
      this.to = value[1] as Date;

      this.loadTimeControlRecords();
    }
  }

  handleState(): void {
    this.filterStateDateRange = !this.filterStateDateRange;
    this.loadTimeControlRecords();
  }

  handleNavigateEmployeeDetails(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(this.siteUrls.employees.details, { id: timeControl.userId });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(timeControlRecordListTableHeaders);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Registro de tiempos', SiteUrls.timeControlRecords.list, '', false);
  }

  /** La primera carga la hace el emit de date-range-selector al setear datos. */
  private loadTimeControlRecords(): void {
    this.loading = false;

    // Filtro date range, requiere 'null' en caso de estar desactivado.
    const url = CommonUtils.urlReplaceParams(ApiUrls.timeControl.getTimesControlByRangePaginated, {
      from: this.filterStateDateRange
        ? DatetimeUtils.toISOString(DateTime.fromJSDate(this.from).startOf('day'))
        : 'null',
      to: this.filterStateDateRange ? DatetimeUtils.toISOString(DateTime.fromJSDate(this.to).endOf('day')) : 'null'
    });

    // Filtros.
    this.apiResult = ApiResult.clone<TimeControlRecordResponse>(this.apiResult);
    this.updateFilters();

    this.timeControlApiService
      .getPaginated<TimeControlRecordResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordResponse>) => {
          this.apiResult = result;
        }
      });
  }

  private updateFilters(): void {
    this.apiResult.removeFilterByPropertyName('incidence');
    this.apiResult.removeFilterByPropertyName('timeState');

    if (this.filterOpenTimesValue) {
      this.apiResult.addFilter(
        'timeState',
        RelationalOperators.equalTo,
        TimeState.open.toString(),
        this.apiResult.filters.length === 0 ? LogicalOperators.none : LogicalOperators.and
      );
    }

    if (this.filterIncidences) {
      this.apiResult.addFilter(
        'incidence',
        RelationalOperators.equalTo,
        this.filterIncidences ? 'true' : 'false',
        this.apiResult.filters.length === 0 ? LogicalOperators.none : LogicalOperators.and
      );
    }
  }
}
