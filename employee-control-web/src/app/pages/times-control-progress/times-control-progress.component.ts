import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { DeviceDetectorService } from 'ngx-device-detector';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../components/buttons/btn-loading/btn-loading.component';
import { DotDangerComponent } from '../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { ProgressStackedCollection } from '../../components/progress/progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../../components/progress/progress-stacked/progress-stacked-item.model';
import { TimeControlProgressComponent } from '../../components/progress/time-control-progress/time-control-progress.component';
import { MonthSelectorComponent } from '../../components/selectors/month-selector/month-selector.component';
import { logError } from '../../core/errors/log-messages';
import { TimeControlProgressStacked } from '../../core/features/times-control/time-control-group';
import { TimeControlGroupResponse } from '../../core/features/times-control/times-control-response.model';
import { ApiUrl } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { DateUtils } from '../../core/utils/date-utils';
import { DateTimeUtils } from '../../core/utils/datetime-utils';
import { DeviceType, deviceToDeviceType } from '../../models/entities/types/device-type.model';
import { TimeState } from '../../models/entities/types/time-state.model';
import { ResultResponse } from '../../models/result-response.model';
import { DatetimeFormatPipe } from '../../pipes/datetime-format.pipe';
import { TimeControlApiService } from '../../services/api/time-control-api.service';
import { JwtService } from '../../services/jwt.service';
import { SimpleGeolocationService } from '../../services/simple-geolocation.service';
import { SnackBarService } from '../../services/snackbar.service';
import { CompanySettingsStateService } from '../../services/states/company-settings-state.service';
import { UserTimeControlStateService } from '../../services/states/user-time-control-state.service';
import { TimeControlIncidenceCreateComponent } from './time-control-incidence-create/time-control-incidence-create.component';
import { TimeControlProgressChangeStateRequest } from './time-control-progress-change-state.request.model';

@Component({
  selector: 'aw-times-control-progress',
  templateUrl: './times-control-progress.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    PageBaseComponent,
    PageHeaderComponent,
    MonthSelectorComponent,
    DotSuccessComponent,
    DotDangerComponent,
    BtnLoadingComponent,
    TimeControlProgressComponent,
    DatetimeFormatPipe
  ]
})
export class TimesControlProgressComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly jwtService = inject(JwtService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly userTimeControlStateService = inject(UserTimeControlStateService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly deviceDetectorService = inject(DeviceDetectorService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);
  private readonly matDialog = inject(MatDialog);

  readonly currentTimeControl = computed(() => this.userTimeControlStateService.timeControl());
  readonly geolocationIsAvailable = computed(() => this.simpleGeolocationService.geolocationIsAvailable());

  private readonly employeeDeviceType: DeviceType;

  progressStackedCollection: Array<ProgressStackedCollection> = [];
  loadingTimeState = false;
  dateSelected = DateTime.local();
  timeStates = TimeState;
  loadingTimeControls = false;
  timeTotalInMonth = '';
  latitude: number | undefined;
  longitude: number | undefined;
  companyGeolocationRequired = false;

  constructor() {
    this.companyGeolocationRequired = this.companySettingsStateService.companySettings()
      ?.geolocationRequired as boolean;

    this.loadTimesControl();

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

  handleDateSelected(date: DateTime): void {
    this.dateSelected = date;
    this.loadTimesControl();
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
      .post<TimeControlProgressChangeStateRequest, ResultResponse>(data, ApiUrl.timeControl.startTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.userTimeControlStateService.refresh();
            this.loadTimesControl();
            this.snackBarService.success('Tiempo iniciado con éxito.');
          } else {
            this.snackBarService.error('Ha ocurrido un error al iniciar el tiempo.');
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
      .put<TimeControlProgressChangeStateRequest, ResultResponse>(data, ApiUrl.timeControl.finishTimeControl)
      .pipe(finalize(() => (this.loadingTimeState = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded && this.currentTimeControl !== undefined) {
            this.userTimeControlStateService.refresh();
            this.loadTimesControl();
            this.snackBarService.success('Tiempo finalizado con éxito.');
          } else {
            this.snackBarService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    const dialogRef = this.matDialog.open(TimeControlIncidenceCreateComponent, {
      data: { timeControlId: progressStackedItem.id }
    });

    dialogRef.afterClosed().subscribe(() => this.loadTimesControl());
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControl(): void {
    this.loadingTimeControls = true;
    this.progressStackedCollection = [];

    const startDate = DateTimeUtils.toISOString(this.dateSelected.startOf('month'));
    const endDate = DateTimeUtils.toISOString(this.dateSelected.endOf('month'));

    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.jwtService.getSid(),
      from: startDate,
      to: endDate
    });

    this.timeControlApiService.get<TimeControlGroupResponse[]>(url).subscribe({
      next: (result: TimeControlGroupResponse[]) => {
        const timeControlProgressStacked = new TimeControlProgressStacked(result, this.dateSelected);
        this.progressStackedCollection = timeControlProgressStacked.compose();

        const timeTotal = result
          .filter((group) => group.totalMinutes > 0)
          .reduce((current, next) => current + next.totalMinutes, 0);

        this.timeTotalInMonth = DateUtils.formatMinutesToTime(timeTotal);
        this.loadingTimeControls = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loadingTimeControls = false;
        logError(error.error);
      }
    });
  }
}
