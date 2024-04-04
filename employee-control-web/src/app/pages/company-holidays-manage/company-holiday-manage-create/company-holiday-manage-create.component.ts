import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormDatepickerComponent } from '../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { DateUtils } from '../../../core/utils/date-utils';
import { DatetimeUtils } from '../../../core/utils/datetime-utils';
import { BadRequest } from '../../../models/bad-request';
import { CompanyHolidaysApiService } from '../../../services/api/company-holidays-api.service';
import { JwtService } from '../../../services/jwt.service';
import { CompanyHolidayManageCreateRequest } from './company-holiday-manage-create.request';

@Component({
  selector: 'aw-company-holiday-manage-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormDatepickerComponent,
    BtnLoadingComponent
  ],
  templateUrl: './company-holiday-manage-create.component.html'
})
export class CompanyHolidayManageCreateComponent implements OnInit {
  @Input({ required: true }) companyHolidayId!: string;
  @Input({ required: true }) date!: DateTime;
  @Output() hasSubmit = new EventEmitter<void>();
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;
  private readonly formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({});
  private readonly bsModalRef = inject(BsModalRef);
  private readonly toastrService = inject(ToastrService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);
  private readonly jwtService = inject(JwtService);

  ngOnInit(): void {
    this.buildForm();
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const companyHolidayManageCreateRequest = this.form.value as CompanyHolidayManageCreateRequest;
    companyHolidayManageCreateRequest.companyId = this.jwtService.getCompanyId();
    companyHolidayManageCreateRequest.date = DatetimeUtils.dateOnly(this.date);

    this.createCompanyHoliday(companyHolidayManageCreateRequest);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      date: [{ value: DateUtils.incrementOffset(this.date.startOf('day').toJSDate()), disabled: true }],
      description: ['', [Validators.required, Validators.max(50)]]
    });
  }

  private createCompanyHoliday(companyHoliday: CompanyHolidayManageCreateRequest): void {
    this.companyHolidaysApiService
      .post<CompanyHolidayManageCreateRequest, string>(companyHoliday, ApiUrls.companyHolidays.createCompanyHoliday)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          if (result) {
            this.toastrService.success('Día festivo creado con éxito.');
            this.hasSubmit.emit();
            this.bsModalRef.hide();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }
}
