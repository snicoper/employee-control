import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { FormInputTypes } from '@aw/core/types/_index';
import { SiteUrls } from '@aw/core/urls/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { User } from '@aw/models/entities/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly toastrService = inject(ToastrService);

  readonly siteUrls = SiteUrls;
  readonly urlEmployeeDetails: string;
  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  form: FormGroup = this.fb.group({});
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
            this.toastrService.error('Ha courrido un error al actualizar el empleado.');

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
      .add('Editar', SiteUrls.employees.edit, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
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
