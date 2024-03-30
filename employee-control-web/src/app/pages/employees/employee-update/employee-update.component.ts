import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormDatepickerComponent } from '../../../components/forms/inputs/form-datepicker/form-datepicker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { FormInputTypes } from '../../../core/types/form-input-types';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { User } from '../../../models/entities/user.model';
import { ResultResponse } from '../../../models/result-response.model';
import { EmployeesApiService } from '../../../services/api/employees-api.service';

@Component({
  selector: 'aw-employee-update',
  templateUrl: './employee-update.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormDatepickerComponent,
    BtnBackComponent,
    BtnLoadingComponent,
    SpinnerComponent
  ]
})
export class EmployeeUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly toastrService = inject(ToastrService);

  readonly siteUrls = SiteUrls;
  readonly urlEmployeeDetails: string;
  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formTypes = FormInputTypes;
  loadingEmployee = false;
  loadingForm = false;
  submitted = false;
  employee: User | undefined;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;
    this.urlEmployeeDetails = urlReplaceParams(SiteUrls.employees.details, { id: this.employeeId });
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
      .put<User, ResultResponse>(employee, ApiUrls.employees.updateEmployee)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.toastrService.error('Ha ocurrido un error al actualizar el empleado.');

            return;
          }

          const url = urlReplaceParams(SiteUrls.employees.details, { id: this.employeeId });
          this.toastrService.success('Datos de empleado actualizados con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.list)
      .add('Detalles', this.urlEmployeeDetails)
      .add('Editar', SiteUrls.employees.update, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.employee?.firstName, [Validators.required]],
      lastName: [this.employee?.lastName, [Validators.required]],
      email: [this.employee?.email, [Validators.email, Validators.required]],
      phoneNumber: [this.employee?.phoneNumber],
      entryDate: [this.employee?.entryDate]
    });
  }

  private loadEmployee(): void {
    this.loadingEmployee = true;
    const url = urlReplaceParams(ApiUrls.employees.getEmployeeById, { id: this.employeeId });

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
