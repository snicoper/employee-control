import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { ResultResponse } from '../../../models/result-response.model';
import { AccountsApiService } from '../../../services/api/accounts-api.service';
import { RegisterValidateRequest } from './register-validate-request.model';

@Component({
  selector: 'aw-register-validate',
  templateUrl: './register-validate.component.html',
  standalone: true,
  imports: [ViewBaseComponent, RouterLink]
})
export class RegisterValidateComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly accountsApiService = inject(AccountsApiService);

  errorMessages: string[] = [];
  siteUrls = SiteUrls;

  private readonly registerValidateRequest: RegisterValidateRequest;

  constructor() {
    this.registerValidateRequest = { code: '', userId: '' };
    this.registerValidateRequest.code = this.route.snapshot.queryParamMap.get('code') as string;
    this.registerValidateRequest.userId = this.route.snapshot.queryParamMap.get('userId') as string;

    if (!this.registerValidateRequest.code || !this.registerValidateRequest.userId) {
      this.errorMessages.push('Faltan datos necesarios para validar el correo electrónico.');
    }
  }

  ngOnInit(): void {
    this.validateEmail();
  }

  private validateEmail(): void {
    this.accountsApiService
      .post<
        RegisterValidateRequest,
        ResultResponse
      >(this.registerValidateRequest, ApiUrls.accounts.registerValidateEmail)
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.errorMessages = result.errors;
          }
        }
      });
  }
}
