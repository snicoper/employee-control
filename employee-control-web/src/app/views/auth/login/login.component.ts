import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { BadRequest } from '@aw/models/_index';
import { JwtService } from '@aw/services/_index';
import { AuthApiService } from '@aw/services/api/_index';
import { CurrentCompanyEmployeeService, EmployeeSettingsService } from '@aw/services/states/_index';
import { finalize } from 'rxjs';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ViewBaseComponent, CardComponent, FormsModule, ReactiveFormsModule, NonFieldErrorsComponent, FormFloatingComponent, RouterLink, BtnLoadingComponent]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly employeeSettingsService = inject(EmployeeSettingsService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  invalidLogin = false;
  formTypes = FormInputTypes;
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.invalidLogin = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const loginRequest = this.form.value as LoginRequest;

    this.authApiService
      .post<LoginRequest, LoginResponse>(loginRequest, ApiUrls.auth.login)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.jwtService.setTokens(result.accessToken, result.refreshToken);

          if (this.jwtService.getToken()) {
            this.currentCompanyEmployeeService.refresh();
            this.employeeSettingsService.refresh();
            const returnUrl = (this.route.snapshot.params['returnUrl'] as string) || '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error as BadRequest;

          if (error.status === HttpStatusCode.Unauthorized) {
            this.invalidLogin = true;
          }
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
