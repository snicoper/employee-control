import { Injectable, inject, signal } from '@angular/core';
import { ApiUrls } from '../../core/urls/_index';
import { CurrentCompanyEmployeeResponse } from '../../models/_index';
import { CompaniesApiService } from '../api/companies-api.service';
import { JwtService } from '../jwt.service';
import { StateService } from './state.service';

/** Compañía actual del usuario. */
@Injectable({ providedIn: 'root' })
export class CurrentCompanyEmployeeStateService implements StateService<CurrentCompanyEmployeeResponse | null> {
  private readonly companiesApiService = inject(CompaniesApiService);
  private readonly jwtService = inject(JwtService);

  private readonly currentCompanyEmployee$ = signal<CurrentCompanyEmployeeResponse | null>(null);

  refresh(): void {
    // Si no esta autenticado, no obtener CurrentCompanyEmployeeResponse.
    if (!this.jwtService.getCompanyId()) {
      return;
    }

    this.companiesApiService.get<CurrentCompanyEmployeeResponse>(ApiUrls.companies.getCompanyByCurrentUser).subscribe({
      next: (result: CurrentCompanyEmployeeResponse) => {
        this.currentCompanyEmployee$.set(result);
      }
    });
  }

  get(): CurrentCompanyEmployeeResponse | null {
    return this.currentCompanyEmployee$();
  }

  set(entity: CurrentCompanyEmployeeResponse | null): void {
    this.currentCompanyEmployee$.set(entity);
  }

  clean(): void {
    this.currentCompanyEmployee$.set(null);
  }
}
