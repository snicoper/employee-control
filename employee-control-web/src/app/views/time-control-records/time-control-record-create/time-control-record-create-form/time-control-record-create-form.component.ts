import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { BtnType } from '../../../../components/buttons/btn-loading/btn-loading.type';
import { FormDatepickerComponent } from '../../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormTimePickerComponent } from '../../../../components/forms/inputs/form-timepicker/form-timepicker.component';
import { ApiUrls, SiteUrls } from '../../../../core/urls/_index';
import { CustomValidation } from '../../../../core/validators/_index';
import { BadRequest, ResultResponse } from '../../../../models/_index';
import { deviceToDeviceType } from '../../../../models/entities/types/_index';
import { TimeControlApiService } from '../../../../services/api/_index';
import { TimeControlRecordCreateRequest } from '../time-control-record-create-request.model';
import { TimeControlRecordCreateService } from '../time-control-record-create.service';

@Component({
  selector: 'aw-time-control-record-create-form',
  templateUrl: './time-control-record-create-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormDatepickerComponent,
    FormTimePickerComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class TimeControlRecordCreateFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);
  private readonly deviceDetectorService = inject(DeviceDetectorService);

  readonly employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  btnType = BtnType;

  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const timeControl = this.getFomData();
    timeControl.userId = this.employeeSelected()?.id as string;
    timeControl.deviceType = deviceToDeviceType(this.deviceDetectorService.getDeviceInfo().deviceType);

    // No permitir fecha/hora mayor a la actual.
    if (new Date() < new Date(timeControl.finish)) {
      this.form.get('timeFinish')?.setErrors({ noFutureDate: true });

      return;
    }

    // Crear tiempo.
    this.loadingForm = true;

    this.timeControlApiService
      .post<TimeControlRecordCreateRequest, ResultResponse>(timeControl, ApiUrls.timeControl.createTimeControl)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tiempo creado con éxito.');
          this.router.navigateByUrl(SiteUrls.timeControlRecords.home);
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

    timeControl.start = start.toISOString();
    timeControl.finish = end.toISOString();

    return timeControl;
  }

  private buildForm(): void {
    const start = new Date();

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

    this.form = this.fb.group(
      {
        dateStart: [startWithOffset, [Validators.required, CustomValidation.noFutureDate]],
        dateFinish: [startWithOffset, [Validators.required, CustomValidation.noFutureDate]],
        timeStart: [startWithOffset, [Validators.required]],
        timeFinish: ['', [Validators.required]]
      },
      {
        validators: [CustomValidation.dateStartGreaterThanFinish('dateStart', 'dateFinish')]
      }
    );
  }
}
