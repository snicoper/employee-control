import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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
import { CommonUtils } from '../../../core/utils/common-utils';
import { DateUtils } from '../../../core/utils/date-utils';
import { BadRequest } from '../../../models/bad-request';
import { ResultResponse } from '../../../models/result-response.model';
import { CompanyHolidaysApiService } from '../../../services/api/company-holidays-api.service';
import { CompanyHolidayManageUpdateRequest } from './company-holiday-manage-update.request';

@Component({
  selector: 'aw-company-holiday-manage-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormDatepickerComponent,
    BtnLoadingComponent
  ],
  templateUrl: './company-holiday-manage-update.component.html'
})
export class CompanyHolidayManageUpdateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly bsModalRef = inject(BsModalRef);
  private readonly toastrService = inject(ToastrService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);

  @Input({ required: true }) companyHolidayId!: string;
  @Input({ required: true }) date!: DateTime;
  @Input({ required: true }) description!: string;

  @Output() hasSubmit = new EventEmitter<void>();

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;

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

    const companyHolidayManageUpdateRequest = this.form.value as CompanyHolidayManageUpdateRequest;
    companyHolidayManageUpdateRequest.id = this.companyHolidayId;

    this.updateCompanyHoliday(companyHolidayManageUpdateRequest);
  }

  handleDelete(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrls.companyHolidays.updateCompanyHoliday, {
      id: this.companyHolidayId
    });

    this.companyHolidaysApiService.delete<ResultResponse>(url).subscribe({
      next: () => {
        this.toastrService.success('Día festivo eliminado con éxito.');
        this.hasSubmit.emit();
        this.bsModalRef.hide();
      }
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      date: [{ value: DateUtils.incrementOffset(this.date.startOf('day').toJSDate()), disabled: true }],
      description: [this.description, [Validators.required, Validators.max(50)]]
    });
  }

  private updateCompanyHoliday(companyHoliday: CompanyHolidayManageUpdateRequest): void {
    const url = CommonUtils.urlReplaceParams(ApiUrls.companyHolidays.updateCompanyHoliday, {
      id: this.companyHolidayId
    });

    this.companyHolidaysApiService
      .put<CompanyHolidayManageUpdateRequest, string>(companyHoliday, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          if (result) {
            this.toastrService.success('Día festivo actualizado con éxito.');
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
