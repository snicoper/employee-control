import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { BtnType } from '../../../components/buttons/btn-loading/btn-type';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormDatetimePickerComponent } from '../../../components/forms/inputs/form-datetime-picker/form-datetime-picker.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { DateTimeUtils } from '../../../core/utils/datetime-utils';
import { CustomValidators } from '../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../models/bad-request';
import { TimeControl } from '../../../models/entities/time-control.model';
import { ResultResponse } from '../../../models/result-response.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { TimeControlRecordRequest } from './time-control-record-request';

@Component({
  selector: 'aw-time-control-record-update',
  templateUrl: './time-control-record-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    FormDatetimePickerComponent,
    BtnBackComponent,
    BtnLoadingComponent,
    FormCheckboxComponent
  ]
})
export class TimeControlRecordUpdateComponent implements OnInit {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly snackBarService = inject(SnackBarService);
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

    // Obtener datos del form antes de comprobar si el form es valido.
    const timeControl = this.getFomData();

    if (this.form.invalid) {
      return;
    }

    // Actualizar tiempo.
    this.updateTimeControl(timeControl);
  }

  private setBreadcrumb(): void {
    const urlDetails = CommonUtils.urlReplaceParams(SiteUrl.timeControlRecords.details, { id: this.timeControlId });

    this.breadcrumb
      .add('Registro de tiempos', SiteUrl.timeControlRecords.list)
      .add('Detalles de tiempo', urlDetails, '')
      .add('Actualizar tiempo', SiteUrl.timeControlRecords.update, '', false);
  }

  private getFomData(): TimeControlRecordRequest {
    const timeControl = {} as TimeControlRecordRequest;

    const startValue = this.form.get('start')?.value;
    const finishValue = this.form.get('finish')?.value;

    const start = DateTime.fromISO(startValue);
    const finish = DateTime.fromISO(finishValue);

    // No permitir fecha/hora futuras.
    if (finish > DateTime.local()) {
      this.form.get('finish')?.setErrors({ noFutureDate: true });
    }

    timeControl.id = this.timeControlId;
    timeControl.start = DateTimeUtils.toISOString(start);
    timeControl.finish = DateTimeUtils.toISOString(finish);
    timeControl.closeIncidence = this.form.get('closeIncidence')?.value as boolean;

    return timeControl;
  }

  private buildForm(): void {
    if (!this.timeControl) {
      return;
    }

    const start = DateTime.fromJSDate(new Date(this.timeControl.start));
    const finish = DateTime.fromJSDate(new Date(this.timeControl.finish as Date));

    this.form = this.formBuilder.group(
      {
        start: [start, [Validators.required, CustomValidators.noFutureDate]],
        finish: [finish, [Validators.required, CustomValidators.noFutureDate]],
        closeIncidence: [false]
      },
      {
        validators: [CustomValidators.dateStartGreaterThanFinish('start', 'finish')]
      }
    );
  }

  private loadTimeControl(): void {
    this.loadingForm = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeControlById, { id: this.timeControlId });

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

  private updateTimeControl(timeControl: TimeControlRecordRequest): void {
    this.loadingForm = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.updateTimeControl, { id: this.timeControlId });

    this.timeControlApiService
      .put<TimeControlRecordRequest, ResultResponse>(timeControl, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tiempo actualizado con éxito.');
          this.router.navigateByUrl(SiteUrl.timeControlRecords.list);
        }
      });
  }
}
