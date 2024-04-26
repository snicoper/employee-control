import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormCompanyCalendarsComponent } from '../../../components/forms/inputs/form-company-calendars/form-company-calendars.component';
import { FormDatepickerComponent } from '../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { FormInputType } from '../../../core/types/form-input-type';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { CompanyCalendar } from '../../../models/entities/company-calendar.model';
import { User } from '../../../models/entities/user.model';
import { ResultResponse } from '../../../models/result-response.model';
import { CompanyCalendarsApiService } from '../../../services/api/company-calendars-api.service';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'aw-employee-update',
  templateUrl: './employee-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinner,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    BtnBackComponent,
    BtnLoadingComponent,
    FormDatepickerComponent,
    FormCompanyCalendarsComponent
  ]
})
export class EmployeeUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);
  private readonly snackBarService = inject(SnackBarService);

  readonly siteUrl = SiteUrl;
  readonly urlEmployeeDetails: string;
  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formInputType = FormInputType;
  loadingEmployee = true;
  loadingForm = false;
  submitted = false;
  employee: User | undefined;
  companyCalendars: Array<CompanyCalendar> = [];

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;
    this.urlEmployeeDetails = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: this.employeeId });
    this.loadEmployee();
    this.setBreadcrumb();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const employee = this.form.value as User;
    employee.id = this.employeeId;

    this.employeesApiService
      .put<User, ResultResponse>(employee, ApiUrl.employees.updateEmployee)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.snackBarService.error('Ha ocurrido un error al actualizar el empleado.');

            return;
          }

          const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: this.employeeId });
          this.snackBarService.success('Datos de empleado actualizados con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrl.employees.list)
      .add('Detalles', this.urlEmployeeDetails)
      .add('Editar', SiteUrl.employees.update, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.employee?.firstName, [Validators.required]],
      lastName: [this.employee?.lastName, [Validators.required]],
      email: [this.employee?.email, [Validators.email, Validators.required]],
      phoneNumber: [this.employee?.phoneNumber],
      entryDate: [this.employee?.entryDate, [Validators.required]],
      companyCalendarId: [this.employee?.companyCalendarId, [Validators.required]]
    });
  }

  private loadEmployee(): void {
    this.loadingEmployee = true;

    const url = CommonUtils.urlReplaceParams(ApiUrl.employees.getEmployeeById, { id: this.employeeId });

    this.employeesApiService
      .get<User>(url)
      .pipe(finalize(() => (this.loadingEmployee = false)))
      .subscribe({
        next: (result: User) => {
          this.employee = result;

          this.buildForm();
        }
      });
  }
}
