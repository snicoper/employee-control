import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { BtnType } from '@aw/components/buttons/btn-loading/btn-loading.type';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { CustomValidation } from '@aw/core/validators/_index';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { TimeControl } from '@aw/models/entities/time-control.model';
import { TimeControlApiService } from '@aw/services/api/time-control-api.service';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlRecordRequest } from './time-control-record-request';

@Component({
  selector: 'aw-time-control-record-update',
  templateUrl: './time-control-record-update.component.html'
})
export class TimeControlRecordUpdateComponent implements OnInit {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  timeControl: TimeControl | undefined;
  btnType = BtnType;
  timeControlId = '';

  ngOnInit(): void {
    this.timeControlId = this.route.snapshot.paramMap.get('id') as string;
    this.setBreadcrumb();
    this.loadTimeControl();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const timeControl = this.getFomData();

    // No permitir fecha/hora mayor a la actual.
    if (new Date() < new Date(timeControl.finish)) {
      this.form.get('timeFinish')?.setErrors({ noFutureDate: true });

      return;
    }

    // Actualizar tiempo.
    this.loadingForm = true;
    const url = urlReplaceParams(ApiUrls.timeControl.updateTimeControl, { id: this.timeControlId });

    this.timeControlApiService
      .put<TimeControlRecordRequest, ResultResponse>(timeControl, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tiempo actualizado con éxito.');
          this.router.navigateByUrl(SiteUrls.timeControlRecords.home);
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Registro de tiempos', SiteUrls.timeControlRecords.home)
      .add('Actualizar tiempo', SiteUrls.timeControlRecords.update, '', false);
  }

  private getFomData(): TimeControlRecordRequest {
    const timeControl = {} as TimeControlRecordRequest;

    const dateStart = new Date(this.form.get('dateStart')?.value);
    const dateFinish = new Date(this.form.get('dateFinish')?.value);
    const timeStart = new Date(this.form.get('timeStart')?.value);
    const timeFinish = new Date(this.form.get('timeFinish')?.value);

    // Resta offset respecto a la zona horaria del usuario.
    const offset = dateStart.getTimezoneOffset();
    const dtOffset = DateTime.local().offset;
    const offsetDiff = offset + dtOffset;

    const start = new Date(
      dateStart.getFullYear(),
      dateStart.getMonth(),
      dateStart.getDate(),
      timeStart.getHours(),
      timeStart.getMinutes() - offsetDiff,
      0
    );

    const end = new Date(
      dateFinish.getFullYear(),
      dateFinish.getMonth(),
      dateFinish.getDate(),
      timeFinish.getHours(),
      timeFinish.getMinutes() - offsetDiff,
      0
    );

    timeControl.id = this.timeControlId;
    timeControl.start = start.toISOString();
    timeControl.finish = end.toISOString();

    return timeControl;
  }

  private buildForm(): void {
    if (!this.timeControl) {
      return;
    }

    const start = new Date(this.timeControl.start);
    let finish = new Date();

    if (this.timeControl.finish) {
      finish = new Date(this.timeControl.finish);
    }

    // Añade offset respecto a la zona horaria del usuario.
    const offset = start.getTimezoneOffset();
    const dtOffset = DateTime.local().offset;
    const offsetDiff = offset + dtOffset;

    const startWithOffset = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes() + offsetDiff,
      0
    );

    const endWithOffset = new Date(
      finish.getFullYear(),
      finish.getMonth(),
      finish.getDate(),
      finish.getHours(),
      finish.getMinutes() + offsetDiff,
      0
    );

    this.form = this.fb.group(
      {
        dateStart: [startWithOffset, [Validators.required, CustomValidation.noFutureDate]],
        dateFinish: [endWithOffset, [Validators.required, CustomValidation.noFutureDate]],
        timeStart: [startWithOffset, [Validators.required]],
        timeFinish: [endWithOffset, []]
      },
      {
        validators: [
          CustomValidation.dateStartGreaterThanFinish('dateStart', 'dateFinish'),
          CustomValidation.dateStartGreaterThanFinish('timeStart', 'timeFinish')
        ]
      }
    );
  }

  private loadTimeControl(): void {
    this.loadingForm = true;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlById, { id: this.timeControlId });

    this.timeControlApiService
      .get<TimeControl>(url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: TimeControl) => {
          this.timeControl = result;
          this.buildForm();
        },
        error: (error: HttpErrorResponse) => (this.badRequest = error.error)
      });
  }
}
