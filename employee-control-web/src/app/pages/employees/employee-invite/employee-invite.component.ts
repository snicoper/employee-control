import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { FormInputType } from '../../../core/types/form-input-type';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CompanySettingsStateService } from '../../../services/states/company-settings-state.service';
import { InviteEmployeeRequest } from './employee-invite-request.model';

@Component({
  selector: 'aw-employee-invite',
  templateUrl: './employee-invite.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    PageBaseComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormTimezoneComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class EmployeeInviteComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);

  readonly breadcrumb = new BreadcrumbCollection();

  readonly formInputType = FormInputType;
  readonly siteUrl = SiteUrl;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // Continue.
    const inviteEmployeeRequest = this.form.value as InviteEmployeeRequest;

    this.employeesApiService
      .post<InviteEmployeeRequest, string>(inviteEmployeeRequest, ApiUrl.employees.inviteEmployee)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          const url = CommonUtils.urlReplaceParams(SiteUrl.employees.details, { id: result });
          this.snackBarService.success('Invitación enviada con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error as BadRequest;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrl.employees.list)
      .add('Invitar empleado', SiteUrl.employees.invite, '', false);
  }

  private buildForm(): void {
    const companySettings = this.companySettingsStateService.get();

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      timezone: [companySettings?.timezone, [Validators.required]]
    });
  }
}
