import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { AccountsApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { RecoveryPasswordRequest } from './recovery-password-request.model';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { RouterLink } from '@angular/router';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-recovery-password',
    templateUrl: './recovery-password.component.html',
    styleUrls: ['./recovery-password.component.scss'],
    standalone: true,
    imports: [ViewBaseComponent, CardComponent, FormsModule, ReactiveFormsModule, NonFieldErrorsComponent, FormFloatingComponent, RouterLink, BtnLoadingComponent]
})
export class RecoveryPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly accountsApiService = inject(AccountsApiService);

  form: FormGroup = this.fb.group({});
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
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }
}
