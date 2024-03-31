import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { BtnType } from '../../../components/buttons/btn-loading/btn-loading.type';
import { CardComponent } from '../../../components/cards/card/card.component';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormDatepickerComponent } from '../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormTimePickerComponent } from '../../../components/forms/inputs/form-timepicker/form-timepicker.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { CustomValidators } from '../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../models/bad-request';
import { TimeControl } from '../../../models/entities/time-control.model';
import { ResultResponse } from '../../../models/result-response.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { TimeControlRecordRequest } from './time-control-record-request';

@Component({
  selector: 'aw-time-control-record-update',
  templateUrl: './time-control-record-update.component.html',
  standalone: true,
  imports: [
    FormsModule,
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
    ReactiveFormsModule,
    FormDatepickerComponent,
    FormTimePickerComponent,
    BtnBackComponent,
    BtnLoadingComponent,
    FormCheckboxComponent,
    SpinnerComponent
  ]
})
export class TimeControlRecordUpdateComponent implements OnInit {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.formBuilder.group({});
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
          this.router.navigateByUrl(SiteUrls.timeControlRecords.list);
        }
      });
  }

  private setBreadcrumb(): void {
    const urlDetails = urlReplaceParams(SiteUrls.timeControlRecords.details, { id: this.timeControlId });

    this.breadcrumb
      .add('Registro de tiempos', SiteUrls.timeControlRecords.list)
      .add('Detalles de tiempo', urlDetails, '')
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

    // Comprobar si start es menor a end.
    if (start > end) {
      this.form.get('timeFinish')?.setErrors({ noFutureDate: true });

      return timeControl;
    }

    timeControl.id = this.timeControlId;
    timeControl.start = start.toISOString();
    timeControl.finish = end.toISOString();
    timeControl.closeIncidence = this.form.get('closeIncidence')?.value as boolean;

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

    this.form = this.formBuilder.group(
      {
        dateStart: [startWithOffset, [Validators.required, CustomValidators.noFutureDate]],
        dateFinish: [endWithOffset, [Validators.required, CustomValidators.noFutureDate]],
        timeStart: [startWithOffset, [Validators.required]],
        timeFinish: [endWithOffset, []],
        closeIncidence: [false]
      },
      {
        validators: [CustomValidators.dateStartGreaterThanFinish('dateStart', 'dateFinish')]
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
