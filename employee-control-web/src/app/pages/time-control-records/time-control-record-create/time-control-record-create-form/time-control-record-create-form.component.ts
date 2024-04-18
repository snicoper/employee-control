import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { BtnType } from '../../../../components/buttons/btn-loading/btn-type';
import { FormDatepickerComponent } from '../../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormDatetimePickerComponent } from '../../../../components/forms/inputs/form-datetime-picker/form-datetime-picker.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { DateTimeUtils } from '../../../../core/utils/datetime-utils';
import { CustomValidators } from '../../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../../models/bad-request';
import { DeviceType } from '../../../../models/entities/types/device-type.model';
import { TimeState } from '../../../../models/entities/types/time-state.model';
import { TimeControlApiService } from '../../../../services/api/time-control-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { TimeControlRecordCreateRequest } from '../time-control-record-create-request.model';
import { TimeControlRecordCreateService } from '../time-control-record-create.service';

@Component({
  selector: 'aw-time-control-record-create-form',
  templateUrl: './time-control-record-create-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    FormDatepickerComponent,
    FormDatetimePickerComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class TimeControlRecordCreateFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);

  readonly employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  btnType = BtnType;
  disabledFinishTimes = true;

  ngOnInit(): void {
    this.buildForm();
  }

  /** Validaciones dinámicas dependiendo de si finaliza o no el tiempo. */
  handleToggleFieldFinish(): void {
    if (this.disabledFinishTimes) {
      this.disabledFinishTimes = false;
      this.enableFieldFinish();
    } else {
      this.disabledFinishTimes = true;
      this.disableFieldFinish();
    }
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const timeControl = this.getFomData();
    timeControl.userId = this.employeeSelected()?.id as string;
    timeControl.deviceType = DeviceType.System;

    // No permitir fecha/hora mayor a la actual en caso de añadir tiempo de finalización.
    if (this.disabledFinishTimes && DateTime.local() < DateTime.fromISO(timeControl.finish)) {
      this.form.get('finish')?.setErrors({ noFutureDate: true });

      return;
    }

    // Crear tiempo.
    this.loadingForm = true;

    this.timeControlApiService
      .post<TimeControlRecordCreateRequest, string>(timeControl, ApiUrl.timeControl.createTimeControl)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tiempo creado con éxito.');
          this.router.navigateByUrl(SiteUrl.timeControlRecords.list);
        }
      });
  }

  private getFomData(): TimeControlRecordCreateRequest {
    const timeControl = {} as TimeControlRecordCreateRequest;

    const startValue = this.form.get('start')?.value;
    const finishValue = this.form.get('finish')?.value;
    const start = DateTime.fromISO(startValue);
    const finish = DateTime.fromISO(finishValue);

    // Comprobar si start es menor a end si se inserta tiempo de finalización.
    if (this.disabledFinishTimes && start > finish) {
      this.form.get('finish')?.setErrors({ noFutureDate: true });

      return timeControl;
    }

    timeControl.start = DateTimeUtils.toISOString(start);
    timeControl.finish = this.disabledFinishTimes ? timeControl.start : DateTimeUtils.toISOString(finish);
    timeControl.timeState = this.disabledFinishTimes ? TimeState.Open : TimeState.Close;

    return timeControl;
  }

  private buildForm(): void {
    const now = DateTime.local();

    // Las validaciones de tiempos de cierre son dinámicos.
    // @see: this.handleToggleFieldFinish().
    this.form = this.formBuilder.group({
      start: [now, [Validators.required, CustomValidators.noFutureDate]],
      finish: [now]
    });

    if (this.disabledFinishTimes) {
      this.disableFieldFinish();
    } else {
      this.enableFieldFinish();
    }
  }

  /** Activa campos del form para finalizar tiempos. */
  private enableFieldFinish(): void {
    const finish = this.form.get('finish');

    finish?.enable();
    finish?.setValidators([Validators.required, CustomValidators.noFutureDate]);

    this.form.addValidators([CustomValidators.dateStartGreaterThanFinish('start', 'finish')]);
    this.form.updateValueAndValidity();
  }

  /** Desactiva campos del form para finalizar tiempos. */
  private disableFieldFinish(): void {
    const finish = this.form.get('finish');

    finish?.disable();
    finish?.setValidators([]);

    this.form.removeValidators([]);
    this.form.updateValueAndValidity();
  }
}
