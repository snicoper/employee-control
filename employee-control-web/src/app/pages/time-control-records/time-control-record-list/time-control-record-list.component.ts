import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { DateRangeSelectorComponent } from '../../../components/selectors/date-range-selector/date-range-selector.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { logError } from '../../../core/errors/log-messages';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { LogicalOperator } from '../../../core/features/api-result/types/logical-operator';
import { OrderType } from '../../../core/features/api-result/types/order-type';
import { RelationalOperator } from '../../../core/features/api-result/types/relational-operator';
import { PeriodDatetime } from '../../../core/models/period-datetime';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { DateTimeUtils } from '../../../core/utils/datetime-utils';
import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { TimeState } from '../../../models/entities/types/time-state.model';
import { ResultResponse } from '../../../models/result-response.model';
import { ClosedByPipe } from '../../../pipes/closed-by.pipe';
import { DateFormatPipe as DateTimePipe } from '../../../pipes/date-format.pipe';
import { DeviceTypePipe } from '../../../pipes/device-type.pipe';
import { DurationToTimePipe } from '../../../pipes/duration-to-time.pipe';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { SimpleGeolocationService } from '../../../services/simple-geolocation.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { TimeControlRecordResponse } from './time-control-record-response.model';

@Component({
  selector: 'aw-time-control-record-list',
  templateUrl: './time-control-record-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    PageBaseComponent,
    PageHeaderComponent,
    DateRangeSelectorComponent,
    DotSuccessComponent,
    DotDangerComponent,
    TableFilterComponent,
    DateTimePipe,
    ClosedByPipe,
    DurationToTimePipe,
    DeviceTypePipe
  ]
})
export class TimeControlRecordListComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();

  readonly displayedColumns = [
    'user.firstName',
    'user.lastName',
    'start',
    'finish',
    'closedBy',
    'timeState',
    'duration',
    'incidence',
    'actions'
  ];
  readonly fieldsFilter = ['user.firstName', 'user.lastName'];
  readonly siteUrl = SiteUrl;
  readonly dateTimeShortFormat = DateTime.DATETIME_SHORT;
  readonly timeState = TimeState;
  readonly closedBy = ClosedBy;

  dataSource!: MatTableDataSource<TimeControlRecordResponse, MatPaginator>;
  apiResult = new ApiResult<TimeControlRecordResponse>();
  loading = true;
  loadingTimeState = false;

  /** Custom filters. */
  filterPeriod!: PeriodDatetime;
  filterOpenTimes = false;
  filterIncidences = false;
  filterDateRangeState = true;

  constructor() {
    this.apiResult.addOrder('start', OrderType.Ascending);
    this.setBreadcrumb();

    const end = DateTime.local();
    const start = end.minus({ days: 7 });
    this.filterPeriod = new PeriodDatetime(start, end);
    this.loadTimesControl();
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

  handleCustomFilters(eventValue: string): void {
    // filterOpenTimesValue.
    if (eventValue === 'open-times' && !this.filterOpenTimes) {
      this.filterOpenTimes = true;
      this.filterIncidences = false;
      this.loadTimesControl();

      return;
    }

    if (eventValue === 'open-times' && this.filterOpenTimes) {
      this.filterOpenTimes = false;
      this.filterIncidences = false;
      this.loadTimesControl();

      return;
    }

    // filterIncidences.
    if (eventValue === 'incidences' && !this.filterIncidences) {
      this.filterIncidences = true;
      this.filterOpenTimes = false;
      this.loadTimesControl();

      return;
    }

    if (eventValue === 'incidences' && this.filterIncidences) {
      this.filterIncidences = false;
      this.filterOpenTimes = false;
      this.loadTimesControl();
    }
  }

  handleTimeControlUpdate(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleDetailsTimeControl(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.details, { id: timeControl.id });

    this.router.navigateByUrl(url);
  }

  handleCloseTimeControl(timeControl: TimeControlRecordResponse): void {
    this.loadingTimeState = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .put<typeof data, ResultResponse>(data, ApiUrl.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.loadTimesControl();
            this.snackBarService.success('Tiempo finalizado con éxito.');
          } else {
            this.snackBarService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleDeleteTimeControl(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.deleteTimeControl, { id: timeControl.id });

    this.timeControlApiService.delete<ResultResponse>(url).subscribe({
      next: (result: ResultResponse) => {
        if (result.succeeded) {
          this.loadTimesControl();
          this.snackBarService.success('Tiempo eliminado con éxito.');
        } else {
          this.snackBarService.error('Ha ocurrido un error al eliminar el tiempo.');
          logError(result.errors.join());
        }
      }
    });
  }

  /** Cambia el valor del filtro para date range. */
  handleDateChange(period: PeriodDatetime): void {
    this.filterPeriod = period;
    this.loadTimesControl();
  }

  /** Activa/desactiva el filtro de date range.  */
  handleToggleFilterDate(): void {
    this.filterDateRangeState = !this.filterDateRangeState;
    this.loadTimesControl();
  }

  handleNavigateEmployeeDetails(timeControl: TimeControlRecordResponse): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: timeControl.userId });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadTimesControl();
  }

  handleFilterChange(apiResult: ApiResult<TimeControlRecordResponse>): void {
    this.apiResult = apiResult;
    this.loadTimesControl();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult.handleSortChange(sortState);
    this.loadTimesControl();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Registro de tiempos', SiteUrl.timeControlRecords.list, '', false);
  }

  /** La primera carga la hace el emit de date-range-selector al setear datos. */
  private loadTimesControl(): void {
    const start = DateTimeUtils.toISOString(this.filterPeriod.start);
    const end = DateTimeUtils.toISOString(this.filterPeriod.end);

    // Filtro date range, requiere 'null' en caso de estar desactivado.
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimesControlByRangePaginated, {
      from: this.filterDateRangeState ? start : String(null),
      to: this.filterDateRangeState ? end : String(null)
    });

    // Update filters.
    this.updateFilters();

    this.timeControlApiService
      .getPaginated<TimeControlRecordResponse>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<TimeControlRecordResponse>) => {
          this.apiResult = ApiResult.clone<TimeControlRecordResponse>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }

  private updateFilters(): void {
    this.apiResult.removeFilterByPropertyName('incidence');
    this.apiResult.removeFilterByPropertyName('timeState');

    if (this.filterOpenTimes) {
      this.apiResult.addFilter(
        'timeState',
        RelationalOperator.EqualTo,
        TimeState.Open.toString(),
        this.apiResult.filters.length === 0 ? LogicalOperator.None : LogicalOperator.And
      );
    }

    if (this.filterIncidences) {
      this.apiResult.addFilter(
        'incidence',
        RelationalOperator.EqualTo,
        this.filterIncidences ? 'true' : 'false',
        this.apiResult.filters.length === 0 ? LogicalOperator.None : LogicalOperator.And
      );
    }
  }
}
