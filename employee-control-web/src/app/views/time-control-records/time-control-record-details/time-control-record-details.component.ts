import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { logError } from '../../../core/errors/log-messages';
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
import { TimeControlRecordDetailsResponse } from './time-control-record-details-response.model';

@Component({
  selector: 'aw-time-control-record-details',
  templateUrl: './time-control-record-details.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    SpinnerComponent,
    DotDangerComponent,
    DotSuccessComponent,
    BtnBackComponent,
    TooltipDirective,
    DatetimePipe,
    DeviceTypePipe,
    ClosedByPipe,
    DurationToTimePipe
  ]
})
export class TimeControlRecordDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly simpleGeolocationService = inject(SimpleGeolocationService);

  private timeControlId = '';

  readonly breadcrumb = new BreadcrumbCollection();

  timeControl: TimeControlRecordDetailsResponse | null = null;
  loadingTimeControl = false;
  timeState = TimeState;
  closedBy = ClosedBy;

  ngOnInit(): void {
    this.timeControlId = this.route.snapshot.paramMap.get('id') as string;
    this.loadTimeControl();
    this.setBreadcrumb();
  }

  getStartOpenStreetMapLink(timeControl: TimeControlRecordDetailsResponse): string | null {
    if (timeControl.latitudeStart && timeControl.longitudeStart) {
      return this.simpleGeolocationService.getOpenStreetMapLink(timeControl.latitudeStart, timeControl.longitudeStart);
    }

    return null;
  }

  getFinishOpenStreetMapLink(timeControl: TimeControlRecordDetailsResponse): string | null {
    if (timeControl.latitudeFinish && timeControl.longitudeFinish) {
      return this.simpleGeolocationService.getOpenStreetMapLink(
        timeControl.latitudeFinish,
        timeControl.longitudeFinish
      );
    }

    return null;
  }

  handleTimeControlUpdate(timeControl: TimeControlRecordDetailsResponse): void {
    const url = urlReplaceParams(SiteUrls.timeControlRecords.update, { id: timeControl.id });
    this.router.navigateByUrl(url);
  }

  handleTimeControlDelete(timeControl: TimeControlRecordDetailsResponse): void {
    const url = urlReplaceParams(ApiUrls.timeControl.deleteTimeControl, { id: timeControl.id });

    this.timeControlApiService.delete<ResultResponse>(url).subscribe({
      next: (result: ResultResponse) => {
        if (result.succeeded) {
          this.toastrService.success('Tiempo eliminado con éxito.');
          this.router.navigateByUrl(SiteUrls.timeControlRecords.home);
        } else {
          this.toastrService.error('Ha ocurrido un error al eliminar el tiempo.');
          logError(result.errors.join());
        }
      }
    });
  }

  handleTimeControlClose(timeControl: TimeControlRecordDetailsResponse): void {
    this.loadingTimeControl = true;
    const data = { timeControlId: timeControl.id };

    this.timeControlApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.timeControl.finishTimeControlByStaff)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Tiempo finalizado con éxito.');
            this.loadTimeControl();
          } else {
            this.toastrService.error('Ha ocurrido un error al iniciar el tiempo.');
            logError(result.errors.join());
          }
        }
      });
  }

  private setBreadcrumb(): void {
    const urlDetails = urlReplaceParams(SiteUrls.timeControlRecords.details, { id: this.timeControlId });

    this.breadcrumb
      .add('Registro de tiempos', SiteUrls.timeControlRecords.home, '')
      .add('Detalles de tiempo', urlDetails, '', false);
  }

  private loadTimeControl(): void {
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlWithEmployeeById, { id: this.timeControlId });
    this.loadingTimeControl = true;

    this.timeControlApiService
      .get<TimeControlRecordDetailsResponse>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: TimeControlRecordDetailsResponse) => {
          this.timeControl = result;
        }
      });
  }
}
