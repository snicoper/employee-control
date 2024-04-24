import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrl } from '../../core/urls/api-urls';
import { CompanyEmployeeStateResponse } from '../../models/states/company-employee-state-response.model';
import { CompaniesApiService } from '../api/companies-api.service';
import { StateService } from './state.service';

/** Compañía actual del usuario. */
@Injectable({ providedIn: 'root' })
export class CompanyEmployeeStateService implements StateService<CompanyEmployeeStateResponse | null> {
  private readonly companiesApiService = inject(CompaniesApiService);

  private readonly currentCompanyEmployeeResponse$ = signal<CompanyEmployeeStateResponse | null>(null);

  readonly currentCompanyEmployeeResponse = computed(() => this.currentCompanyEmployeeResponse$());

  refresh(): void {
    this.companiesApiService.get<CompanyEmployeeStateResponse>(ApiUrl.companies.getCompanyByCurrentUser).subscribe({
      next: (result: CompanyEmployeeStateResponse) => {
        this.currentCompanyEmployeeResponse$.set(result);
      }
    });
  }

  get(): CompanyEmployeeStateResponse | null {
    return this.currentCompanyEmployeeResponse$();
  }

  set(entity: CompanyEmployeeStateResponse | null): void {
    this.currentCompanyEmployeeResponse$.set(entity);
  }

  clean(): void {
    this.currentCompanyEmployeeResponse$.set(null);
  }
}
