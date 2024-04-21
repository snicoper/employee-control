import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormDatepickerComponent } from '../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { CalendarEvent } from '../../../components/year-calendar-view/calendar-event.model';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { ResultResponse } from '../../../models/result-response.model';
import { CompanyHolidaysApiService } from '../../../services/api/company-holidays-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CompanyHolidayManageUpdateRequest } from './company-holiday-manage-update.request';

@Component({
  selector: 'aw-company-holiday-update',
  templateUrl: './company-holiday-update.component.html',
  styleUrl: './company-holiday-update.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormDatepickerComponent,
    FormInputComponent,
    BtnLoadingComponent
  ]
})
export class CompanyHolidayUpdateComponent implements OnInit {
  private readonly dialogData = inject<{ calendarEvent: CalendarEvent }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<CompanyHolidayUpdateComponent>);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackBarService);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loadingForm = false;

  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;
    const companyHolidayManageCreateRequest = this.form.value as CompanyHolidayManageUpdateRequest;
    companyHolidayManageCreateRequest.id = this.dialogData.calendarEvent.id as string;
    this.updateCompanyHoliday(companyHolidayManageCreateRequest);
  }

  handleDelete(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyHolidays.updateCompanyHoliday, {
      id: this.dialogData.calendarEvent.id as string
    });

    this.companyHolidaysApiService.delete<ResultResponse>(url).subscribe({
      next: () => {
        this.snackBarService.success('Día festivo eliminado con éxito.');
        this.dialogRef.close();
      }
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      date: [{ value: this.dialogData.calendarEvent.date, disabled: true }, [Validators.required]],
      description: [this.dialogData.calendarEvent.description, [Validators.required, Validators.max(50)]]
    });
  }

  private updateCompanyHoliday(companyHoliday: CompanyHolidayManageUpdateRequest): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyHolidays.updateCompanyHoliday, {
      id: this.dialogData.calendarEvent.id as string
    });

    this.companyHolidaysApiService
      .put<CompanyHolidayManageUpdateRequest, string>(companyHoliday, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: string) => {
          if (result) {
            this.snackBarService.success('Día festivo actualizado con éxito.');
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }
}
