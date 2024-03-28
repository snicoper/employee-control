import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { FormInputTypes } from '../../../core/types/form-input-types';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { BadRequest } from '../../../models/bad-request';
import { AccountsApiService } from '../../../services/api/accounts-api.service';
import { CurrentCompanySettingsStateService } from '../../../services/states/current-company-settings-state.service';
import { RegisterRequest } from './register-request.model';

@Component({
  selector: 'aw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ViewBaseComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    FormFloatingComponent,
    FormTimezoneComponent,
    RouterLink,
    BtnLoadingComponent
  ]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly accountsApiService = inject(AccountsApiService);
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);
  private readonly route = inject(Router);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const registerRequest = this.form.value as RegisterRequest;

    this.accountsApiService
      .post<RegisterRequest, string>(registerRequest, ApiUrls.accounts.registerAccount)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('La cuenta ha sido creada con éxito.');
          this.route.navigateByUrl(SiteUrls.accounts.registerSuccess);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      timezone: [this.currentCompanySettingsStateService.companySettings()?.timezone, [Validators.required]]
    });
  }
}
