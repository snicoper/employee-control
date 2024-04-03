import { NgClass } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { BtnType } from '../../../../components/buttons/btn-loading/btn-loading.type';
import { FormDatepickerComponent } from '../../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormTimePickerComponent } from '../../../../components/forms/inputs/form-timepicker/form-timepicker.component';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { DateUtils } from '../../../../core/utils/date-utils';
import { CustomValidators } from '../../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../../models/bad-request';
import { deviceToDeviceType } from '../../../../models/entities/types/device-type.model';
import { TimeState } from '../../../../models/entities/types/time-state.model';
import { TimeControlApiService } from '../../../../services/api/time-control-api.service';
import { TimeControlRecordCreateRequest } from '../time-control-record-create-request.model';
import { TimeControlRecordCreateService } from '../time-control-record-create.service';

@Component({
  selector: 'aw-time-control-record-create-form',
  templateUrl: './time-control-record-create-form.component.html',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    FormDatepickerComponent,
    FormTimePickerComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class TimeControlRecordCreateFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);
  private readonly deviceDetectorService = inject(DeviceDetectorService);

  readonly employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  btnType = BtnType;
  formAddFinishTimes = false;

  ngOnInit(): void {
    this.buildForm();
  }

  /** Validaciones dinámicas dependiendo de si finaliza o no el tiempo. */
  handleToggleFinishDateAndTime(): void {
    if (this.formAddFinishTimes) {
      this.formAddFinishTimes = false;

      this.deactivateFormFinish();
    } else {
      this.formAddFinishTimes = true;

      this.activateFormFinish();
    }
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const timeControl = this.getFomData();
    timeControl.userId = this.employeeSelected()?.id as string;
    timeControl.deviceType = deviceToDeviceType(this.deviceDetectorService.getDeviceInfo().deviceType);

    // No permitir fecha/hora mayor a la actual en caso de añadir tiempo de finalización.
    if (this.formAddFinishTimes && new Date() < new Date(timeControl.finish)) {
      this.form.get('timeFinish')?.setErrors({ noFutureDate: true });

      return;
    }

    // Crear tiempo.
    this.loadingForm = true;

    this.timeControlApiService
      .post<TimeControlRecordCreateRequest, string>(timeControl, ApiUrls.timeControl.createTimeControl)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tiempo creado con éxito.');
          this.router.navigateByUrl(SiteUrls.timeControlRecords.list);
        }
      });
  }

  private getFomData(): TimeControlRecordCreateRequest {
    const timeControl = {} as TimeControlRecordCreateRequest;

    const dateStart = new Date(this.form.get('dateStart')?.value);
    const dateFinish = new Date(this.form.get('dateFinish')?.value);
    const timeStart = new Date(this.form.get('timeStart')?.value);
    const timeFinish = new Date(this.form.get('timeFinish')?.value);

    // Resta offset respecto a la zona horaria del usuario.
    const start = DateUtils.decrementOffset(dateStart, timeStart);
    const end = DateUtils.decrementOffset(dateFinish, timeFinish);

    // Comprobar si start es menor a end si se inserta tiempos de finalización.
    if (this.formAddFinishTimes && start > end) {
      this.form.get('timeFinish')?.setErrors({ noFutureDate: true });

      return timeControl;
    }

    timeControl.start = DateUtils.toISOString(start);
    timeControl.finish = this.formAddFinishTimes ? DateUtils.toISOString(end) : timeControl.start;
    timeControl.timeState = this.formAddFinishTimes ? TimeState.close : TimeState.open;

    return timeControl;
  }

  private buildForm(): void {
    const start = new Date();

    // Añade offset respecto a la zona horaria del usuario.
    const nowWithOffsets = DateUtils.incrementOffset(start);

    // Las validaciones de tiempos de cierre son dinámicos.
    // @see: this.handleToggleFinishDateAndTime().
    this.form = this.formBuilder.group({
      dateStart: [nowWithOffsets, [Validators.required, CustomValidators.noFutureDate]],
      timeStart: [nowWithOffsets, [Validators.required]],
      dateFinish: [nowWithOffsets],
      timeFinish: [nowWithOffsets]
    });

    if (this.formAddFinishTimes) {
      this.activateFormFinish();
    } else {
      this.deactivateFormFinish();
    }
  }

  /** Activa campos del form para finalizar tiempos. */
  private activateFormFinish(): void {
    const dateFinishControl = this.form.get('dateFinish');
    const timeFinishControl = this.form.get('timeFinish');

    dateFinishControl?.enable();
    dateFinishControl?.setValidators([Validators.required, CustomValidators.noFutureDate]);

    timeFinishControl?.enable();
    timeFinishControl?.setValidators([Validators.required]);

    this.form.addValidators([CustomValidators.dateStartGreaterThanFinish('dateStart', 'dateFinish')]);
    this.form.updateValueAndValidity();
  }

  /** Desactiva campos del form para finalizar tiempos. */
  private deactivateFormFinish(): void {
    const dateFinishControl = this.form.get('dateFinish');
    const timeFinishControl = this.form.get('timeFinish');

    dateFinishControl?.disable();
    dateFinishControl?.setValidators([]);

    timeFinishControl?.disable();
    timeFinishControl?.setValidators([]);

    this.form.removeValidators([]);
    this.form.updateValueAndValidity();
  }
}
