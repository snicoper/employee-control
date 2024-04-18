import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FieldErrorComponent } from '../../../components/forms/errors/field-error/field-error.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageSimpleComponent } from '../../../components/pages/page-simple/page-simple.component';
import { FormInputType } from '../../../core/types/form-input-type';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { BadRequest } from '../../../models/bad-request';
import { ResultResponse } from '../../../models/result-response.model';
import { AccountsApiService } from '../../../services/api/accounts-api.service';
import { RecoveryPasswordRequest } from './recovery-password-request.model';

@Component({
  selector: 'aw-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    MatButtonModule,
    PageSimpleComponent,
    FormInputComponent,
    NonFieldErrorsComponent,
    BtnLoadingComponent,
    FieldErrorComponent
  ]
})
export class RecoveryPasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly accountsApiService = inject(AccountsApiService);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formInputType = FormInputType;
  siteUrl = SiteUrl;
  submitted = false;
  loading = false;
  messageResponse = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.messageResponse = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const recoveryPasswordRequest = this.form.value as RecoveryPasswordRequest;

    this.accountsApiService
      .post<RecoveryPasswordRequest, ResultResponse>(recoveryPasswordRequest, ApiUrl.accounts.recoveryPassword)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.messageResponse = true;
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }
}
