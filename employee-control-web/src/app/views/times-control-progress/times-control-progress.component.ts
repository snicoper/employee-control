import { Component, computed, inject } from '@angular/core';
import { DateTime } from 'luxon';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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
import { logError } from '../../core/errors/log-messages';
import { TimeControlProgressStacked } from '../../core/features/times-control/time-control-group';
import { TimeControlGroupResponse } from '../../core/features/times-control/times-control-response.model';
import { ApiUrls } from '../../core/urls/api-urls';
import { urlReplaceParams } from '../../core/utils/common-utils';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { DeviceType, deviceToDeviceType } from '../../models/entities/types/device-type.model';
import { TimeState } from '../../models/entities/types/time-state.model';
import { ResultResponse } from '../../models/result-response.model';
import { DatetimeFormatPipe } from '../../pipes/datetime-format.pipe';
import { TimeControlApiService } from '../../services/api/time-control-api.service';
import { JwtService } from '../../services/jwt.service';
import { SimpleGeolocationService } from '../../services/simple-geolocation.service';
import { CurrentTimeControlStateService } from '../../services/states/current-time-control-state.service';
import { TimeControlIncidenceCreateComponent } from './time-control-incidence-create/time-control-incidence-create.component';
import { TimeControlProgressChangeStateRequest } from './time-control-progress-change-state.request.model';

@Component({
  selector: 'aw-times-control-progress',
  templateUrl: './times-control-progress.component.html',
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
  ],
  providers: [BsModalService]
})
export class TimesControlProgressComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly deviceDetectorService = inject(DeviceDetectorService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly bsModalService = inject(BsModalService);

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
  bsModalRef?: BsModalRef;

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
    const data: TimeControlProgressChangeStateRequest = {
      employeeId: this.jwtService.getSid(),
      deviceType: this.employeeDeviceType,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.timeControlApiService
      .post<TimeControlProgressChangeStateRequest, ResultResponse>(data, ApiUrls.timeControl.startTimeControl)
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
    const data: TimeControlProgressChangeStateRequest = {
      employeeId: this.jwtService.getSid(),
      deviceType: this.employeeDeviceType,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.timeControlApiService
      .put<TimeControlProgressChangeStateRequest, ResultResponse>(data, ApiUrls.timeControl.finishTimeControl)
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
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        timeControlId: progressStackedItem.id
      }
    };

    this.bsModalRef = this.bsModalService.show(TimeControlIncidenceCreateComponent, initialState);
    this.bsModalRef.content?.hasSubmit.subscribe({
      next: () => {
        this.loadTimesControlRange();
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
