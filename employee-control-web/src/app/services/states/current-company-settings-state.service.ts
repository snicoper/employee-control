import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrls } from '../../core/urls/api-urls';
import { urlReplaceParams } from '../../core/utils/common-utils';
import { CompanySettings } from '../../models/entities/company-settings.model';
import { CompanySettingsApiService } from '../api/company-settings-api.service';
import { JwtService } from '../jwt.service';
import { StateService } from './state.service';

/** Settings de la compañía actual. */
@Injectable({ providedIn: 'root' })
export class CurrentCompanySettingsStateService implements StateService<CompanySettings | null> {
  private readonly companySettingsApiService = inject(CompanySettingsApiService);
  private readonly jwtService = inject(JwtService);

  private readonly companySettings$ = signal<CompanySettings | null>(null);
  private readonly loadingCompanySettings$ = signal(false);

  readonly companySettings = computed(() => this.companySettings$());
  readonly loadingCompanySettings = computed(() => this.loadingCompanySettings$());

  refresh(): void {
    this.loadCompanySettings();
  }

  get(): CompanySettings | null {
    return this.companySettings$();
  }

  clean(): void {
    this.loadingCompanySettings$.set(false);
    this.companySettings$.set(null);
  }

  private loadCompanySettings(): void {
    this.loadingCompanySettings$.set(true);
    const url = urlReplaceParams(ApiUrls.companySettings.getCompanySettingsByCompanyId, {
      companyId: this.jwtService.getCompanyId()
    });

    this.companySettingsApiService
      .get<CompanySettings>(url)
      .pipe(finalize(() => this.loadingCompanySettings$.set(false)))
      .subscribe({
        next: (result: CompanySettings) => this.companySettings$.set(result)
      });
  }
}
