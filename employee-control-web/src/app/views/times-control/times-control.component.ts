import { Component, computed, inject } from '@angular/core';
import { DateTime } from 'luxon';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../components/cards/card/card.component';
import { DotDangerComponent } from '../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../components/colors/dot-success/dot-success.component';
import { ProgressStackedCollection } from '../../components/progress/progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../../components/progress/progress-stacked/progress-stacked-item.model';
import { TimeControlProgressComponent } from '../../components/progress/time-control-progress/time-control-progress.component';
import { MonthSelectorComponent } from '../../components/selectors/month-selector/month-selector.component';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../components/views/view-header/view-header.component';
import { logError } from '../../core/errors/_index';
import { TimeControlGroupResponse } from '../../core/features/times-control/_index';
import { TimeControlProgressStacked } from '../../core/features/times-control/time-control-group';
import { ApiUrls } from '../../core/urls/_index';
import { DatetimeUtils, urlReplaceParams } from '../../core/utils/_index';
import { ResultResponse } from '../../models/_index';
import { DeviceType, TimeState, deviceToDeviceType } from '../../models/entities/types/_index';
import { DatetimeFormatPipe } from '../../pipes/datetime-format.pipe';
import { JwtService } from '../../services/_index';
import { TimeControlApiService } from '../../services/api/_index';
import { SimpleGeolocationService } from '../../services/simple-geolocation.service';
import { CurrentTimeControlStateService } from '../../services/states/_index';
import { TimeControlChangeStateRequest } from './time-control-change-state.request.model';

@Component({
  selector: 'aw-times-control',
  templateUrl: './times-control.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    MonthSelectorComponent,
    DotSuccessComponent,
    DotDangerComponent,
    BtnLoadingComponent,
    TimeControlProgressComponent,
    DatetimeFormatPipe
  ]
})
export class TimesControlComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly deviceDetectorService = inject(DeviceDetectorService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);

  readonly currentTimeControl = computed(() => this.currentTimeControlStateService.currentTimeControl());

  private readonly employeeDeviceType: DeviceType;

  progressStackedCollection: ProgressStackedCollection[] = [];
  loadingTimeState = false;
  dateSelected = new Date();
  timeStates = TimeState;
  loadingTimeControls = false;
  timeTotalInMonth = '';
  latitude: number | undefined;
  longitude: number | undefined;

  constructor() {
    this.loadTimesControlRange();

    this.simpleGeolocationService
      .getCurrentPosition()
      .then((result: GeolocationPosition) => {
        this.latitude = result.coords.latitude;
        this.longitude = result.coords.longitude;
      })
      .catch((error: GeolocationPositionError) => logError(error.message));

    const deviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
    this.employeeDeviceType = deviceToDeviceType(deviceType);
  }

  handleDateSelected(date: Date): void {
    this.dateSelected = date;
    this.loadTimesControlRange();
  }

  /** Abrir tiempo de actividad. */
  handleTimeStart(): void {
    this.loadingTimeState = true;
    const data: TimeControlChangeStateRequest = {
      employeeId: this.jwtService.getSid(),
      deviceType: this.employeeDeviceType,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.timeControlApiService
      .post<TimeControlChangeStateRequest, ResultResponse>(data, ApiUrls.timeControl.startTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.currentTimeControlStateService.refresh();
            this.loadTimesControlRange();
            this.toastrService.success('Tiempo iniciado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  /** Cerrar tiempo de actividad. */
  handleTimeFinished(): void {
    this.loadingTimeState = true;
    const data: TimeControlChangeStateRequest = {
      employeeId: this.jwtService.getSid(),
      deviceType: this.employeeDeviceType,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.timeControlApiService
      .post<TimeControlChangeStateRequest, ResultResponse>(data, ApiUrls.timeControl.finishTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.currentTimeControlStateService.refresh();
            this.loadTimesControlRange();
            this.toastrService.success('Tiempo finalizado con éxito.');
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    // Manejar click.
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControlRange(): void {
    this.loadingTimeControls = true;
    this.progressStackedCollection = [];

    const dateSelected = DateTime.fromJSDate(this.dateSelected);
    const startDate = dateSelected.startOf('month');
    const endDate = dateSelected.endOf('month');

    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.jwtService.getSid(),
      from: startDate.toUTC().toString(),
      to: endDate.toUTC().toString()
    });

    this.timeControlApiService
      .get<TimeControlGroupResponse[]>(url)
      .pipe(finalize(() => (this.loadingTimeControls = false)))
      .subscribe({
        next: (result: TimeControlGroupResponse[]) => {
          const timeControlProgressStacked = new TimeControlProgressStacked(result, this.dateSelected);
          this.progressStackedCollection = timeControlProgressStacked.compose();

          const timeTotal = result
            .filter((group) => group.totalMinutes > 0)
            .reduce((current, next) => current + next.totalMinutes, 0);

          this.timeTotalInMonth = DatetimeUtils.formatMinutesToTime(timeTotal);
        }
      });
  }
}
