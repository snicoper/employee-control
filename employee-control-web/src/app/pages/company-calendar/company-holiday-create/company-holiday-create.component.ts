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
import { DateTimeUtils } from '../../../core/utils/datetime-utils';
import { BadRequest } from '../../../models/bad-request';
import { CompanyHolidaysApiService } from '../../../services/api/company-holidays-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CompanyHolidayManageCreateRequest } from './company-holiday-manage-create.request';

@Component({
  selector: 'aw-company-holiday-create',
  templateUrl: './company-holiday-create.component.html',
  styleUrl: './company-holiday-create.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormInputComponent,
    FormDatepickerComponent,
    BtnLoadingComponent
  ]
})
export class CompanyHolidayCreateComponent implements OnInit {
  private readonly dialogData = inject<{ calendarEvent: CalendarEvent }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<CompanyHolidayCreateComponent>);
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
    const companyHolidayManageCreateRequest = this.form.value as CompanyHolidayManageCreateRequest;
    companyHolidayManageCreateRequest.date = DateTimeUtils.dateOnly(this.dialogData.calendarEvent.date);
    this.createCompanyHoliday(companyHolidayManageCreateRequest);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      date: [{ value: this.dialogData.calendarEvent.date, disabled: true }, [Validators.required]],
      description: ['', [Validators.required, Validators.max(50)]]
    });
  }

  private createCompanyHoliday(companyHoliday: CompanyHolidayManageCreateRequest): void {
    this.companyHolidaysApiService
      .post<CompanyHolidayManageCreateRequest, string>(
        companyHoliday,
        ApiUrl.companyCalendarHolidays.createCompanyCalendarHoliday
      )
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: string) => {
          if (result) {
            this.snackBarService.success('Día festivo creado con éxito.');
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }
}
