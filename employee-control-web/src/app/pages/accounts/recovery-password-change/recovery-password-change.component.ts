import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
import { RecoveryPasswordChangeRequest } from './recovery-password-change-request.model';

@Component({
  selector: 'aw-recovery-password-change',
  templateUrl: './recovery-password-change.component.html',
  styleUrls: ['./recovery-password-change.component.scss'],
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
export class RecoveryPasswordChangeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly accountsApiService = inject(AccountsApiService);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;
  errorMessages: string[] = [];

  private readonly recoveryPasswordChangeRequest: RecoveryPasswordChangeRequest;

  constructor() {
    this.recoveryPasswordChangeRequest = { userId: '', code: '', password: '', confirmPassword: '' };
    this.recoveryPasswordChangeRequest.code = this.route.snapshot.queryParamMap.get('code') as string;
    this.recoveryPasswordChangeRequest.userId = this.route.snapshot.queryParamMap.get('userId') as string;

    if (!this.recoveryPasswordChangeRequest.code || !this.recoveryPasswordChangeRequest.userId) {
      this.errorMessages.push('Faltan datos necesarios para validar el correo electrónico.');
    }

    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.errorMessages = [];

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.recoveryPasswordChangeRequest.password = this.form.get('password')?.value;
    this.recoveryPasswordChangeRequest.confirmPassword = this.form.get('confirmPassword')?.value;

    this.accountsApiService
      .post<RecoveryPasswordChangeRequest, ResultResponse>(
        this.recoveryPasswordChangeRequest,
        ApiUrls.accounts.recoveryPasswordChange
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.errorMessages = result.errors;

            return;
          }

          this.toastrService.success('Contraseña restablecida con éxito');
          this.router.navigateByUrl(SiteUrls.auth.login);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
}
