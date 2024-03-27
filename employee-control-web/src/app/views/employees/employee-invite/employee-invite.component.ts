import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { FormInputTypes } from '../../../core/types/_index';
import { ApiUrls, SiteUrls } from '../../../core/urls/_index';
import { urlReplaceParams } from '../../../core/utils/_index';
import { BadRequest } from '../../../models/_index';
import { JwtService } from '../../../services/_index';
import { EmployeesApiService } from '../../../services/api/_index';
import { CurrentCompanySettingsStateService } from '../../../services/states/_index';
import { InviteEmployeeRequest } from './employee-invite-request.model';

@Component({
  selector: 'aw-employee-invite',
  templateUrl: './employee-invite.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormTimezoneComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class EmployeeInviteComponent {
  private readonly fb = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  formInputTypes = FormInputTypes;
  submitted = false;
  loading = false;
  siteUrls = SiteUrls;

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
    inviteEmployeeRequest.companyId = this.jwtService.getCompanyId();

    this.employeesApiService
      .post<InviteEmployeeRequest, string>(inviteEmployeeRequest, ApiUrls.employees.inviteEmployee)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          const url = urlReplaceParams(SiteUrls.employees.details, { id: result });
          this.toastrService.success('Invitación enviada con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error as BadRequest;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.list)
      .add('Invitar empleado', SiteUrls.employees.invite, '', false);
  }

  private buildForm(): void {
    const companySettings = this.currentCompanySettingsStateService.get();

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      timezone: [companySettings?.timezone, [Validators.required]]
    });
  }
}
