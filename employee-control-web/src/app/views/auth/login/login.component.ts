import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { FormInputTypes } from '../../../core/types/_index';
import { ApiUrls, SiteUrls } from '../../../core/urls/_index';
import { BadRequest } from '../../../models/_index';
import { JwtService, UserStatesService } from '../../../services/_index';
import { AuthApiService } from '../../../services/api/_index';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ViewBaseComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    FormFloatingComponent,
    RouterLink,
    BtnLoadingComponent
  ]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly userStatesService = inject(UserStatesService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
    this.jwtService.removeTokens();
    this.userStatesService.clean();
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
          this.userStatesService.load();

          if (this.jwtService.getToken()) {
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
