import { Component, computed, inject } from '@angular/core';
import { ProgressStackedCollection } from '@aw/components/progress/progress-stacked/progress-stacked-collection';
import { logError } from '@aw/core/errors/log-messages';
import { TimeControlGroupResponse } from '@aw/core/features/times-control/_index';
import { TimeControlProgressStacked } from '@aw/core/features/times-control/time-control-group';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { DatetimeUtils } from '@aw/core/utils/datetime-utils';
import { DeviceType, deviceToDeviceType } from '@aw/models/entities/types/device-type.model';
import { TimeState } from '@aw/models/entities/types/time-state.model';
import { ResultResponse } from '@aw/models/result-response.model';
import { JwtService } from '@aw/services/_index';
import { TimeControlApiService } from '@aw/services/api/_index';
import { SimpleGeolocationService } from '@aw/services/simple-geolocation.service';
import { CurrentTimeControlStateService } from '@aw/services/states/_index';
import { DateTime } from 'luxon';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlChangeStateRequest } from './time-control-change-state.request.model';

@Component({
  selector: 'aw-times-control',
  templateUrl: './times-control.component.html'
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
