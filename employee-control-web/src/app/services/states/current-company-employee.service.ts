import { Injectable, inject, signal } from '@angular/core';
import { ApiUrls } from '../../core/urls/_index';
import { CurrentCompanyEmployeeResponse } from '../../models/_index';
import { CompaniesApiService } from '../api/companies-api.service';
import { JwtService } from '../jwt.service';

/** Compañía actual del usuario. */
@Injectable({ providedIn: 'root' })
export class CurrentCompanyEmployeeService {
  private readonly companiesApiService = inject(CompaniesApiService);
  private readonly jwtService = inject(JwtService);

  private readonly currentCompanyEmployeeResponse$ = signal<CurrentCompanyEmployeeResponse | null>(null);

  refresh(): void {
    // Si no esta autenticado, no obtener CompanyByCurrentUser.
    if (!this.jwtService.getCompanyId()) {
      return;
    }

    this.companiesApiService.get<CurrentCompanyEmployeeResponse>(ApiUrls.companies.getCompanyByCurrentUser).subscribe({
      next: (result: CurrentCompanyEmployeeResponse) => {
        this.currentCompanyEmployeeResponse$.set(result);
      }
    });
  }

  getValue(): CurrentCompanyEmployeeResponse | null {
    return this.currentCompanyEmployeeResponse$();
  }

  setValue(entity: CurrentCompanyEmployeeResponse | null): void {
    this.currentCompanyEmployeeResponse$.set(entity);
  }

  clean(): void {
    this.currentCompanyEmployeeResponse$.set(null);
  }
}
