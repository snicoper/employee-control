import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { CompanySettings } from '@aw/models/entities/company-settings.model';
import { finalize } from 'rxjs';
import { CompanySettingsApiService } from '../api/company-settings-api.service';
import { JwtService } from '../jwt.service';

/** Settings de la compañía actual. */
@Injectable({ providedIn: 'root' })
export class CurrentCompanySettingsService {
  private readonly companySettingsApiService = inject(CompanySettingsApiService);
  private readonly jwtService = inject(JwtService);

  private readonly companySettings$ = signal<CompanySettings | null>(null);
  private readonly loadingCompanySettings$ = signal(false);

  readonly companySettings = computed(() => this.companySettings$());
  readonly loadingCompanySettings = computed(() => this.loadingCompanySettings$());

  refresh(): void {
    this.loadCompanySettings();
  }

  getCompanySettingsValue(): CompanySettings | null {
    return this.companySettings$();
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
