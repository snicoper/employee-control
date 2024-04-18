import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { AuthApiService } from '../../../services/api/auth-api.service';
import { JwtService } from '../../../services/jwt.service';
import { UserStatesService } from '../../../services/states/user-states.service';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatDivider,
    PageSimpleComponent,
    FormInputComponent,
    FieldErrorComponent,
    NonFieldErrorsComponent,
    BtnLoadingComponent
  ]
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly userStatesService = inject(UserStatesService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  formInputType = FormInputType;
  submitted = false;
  invalidResponse = false;
  loading = false;
  siteUrl = SiteUrl;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.jwtService.removeTokens();
    this.userStatesService.clean();
    this.submitted = true;
    this.invalidResponse = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const loginRequest = this.form.value as LoginRequest;

    this.authApiService
      .post<LoginRequest, LoginResponse>(loginRequest, ApiUrl.auth.login)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.jwtService.setTokens(result.accessToken, result.refreshToken);
          this.userStatesService.load();

          if (this.jwtService.getToken()) {
            const returnUrl = (this.route.snapshot.params['returnUrl'] as string) || '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.invalidResponse = true;
          } else {
            this.badRequest = error.error as BadRequest;
          }
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
