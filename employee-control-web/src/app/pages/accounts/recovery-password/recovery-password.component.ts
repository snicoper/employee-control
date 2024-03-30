import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { FormInputTypes } from '../../../core/types/form-input-types';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
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
    PageBaseComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    FormFloatingComponent,
    RouterLink,
    BtnLoadingComponent
  ]
})
export class RecoveryPasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly accountsApiService = inject(AccountsApiService);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;
  hasResponse = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.hasResponse = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const recoveryPasswordRequest = this.form.value as RecoveryPasswordRequest;

    this.accountsApiService
      .post<RecoveryPasswordRequest, ResultResponse>(recoveryPasswordRequest, ApiUrls.accounts.recoveryPassword)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.hasResponse = true;
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
