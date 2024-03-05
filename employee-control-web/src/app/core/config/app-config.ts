import { Injectable, inject } from '@angular/core';
import { AuthService, ThemeColorService } from '@aw/services/_index';
import {
  CurrentCompanyEmployeeService,
  CurrentCompanySettingsService,
  CurrentTimeControlStateService,
  EmployeeSettingsService
} from '@aw/services/states/_index';
import { LocalizationService } from '../features/localizations/_index';

/** Configuración inicial de la aplicación. */
@Injectable()
export class AppConfig {
  private readonly authService = inject(AuthService);
  private readonly themeColorService = inject(ThemeColorService);
  private readonly localizationService = inject(LocalizationService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly EmployeeSettingsService = inject(EmployeeSettingsService);

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.authService.authValue$()) {
        this.currentCompanyEmployeeService.refresh();
        this.currentTimeControlStateService.refresh();
        this.currentCompanySettingsService.refresh();
        this.EmployeeSettingsService.refresh();
      }

      this.themeColorService.initialize();
      this.localizationService.initialize();

      resolve(true);
    });
  }
}
