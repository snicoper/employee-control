import { Injectable, inject } from '@angular/core';
import { AuthService, ThemeColorService, UserStatesService } from '../../services/_index';
import { LocalizationService } from '../features/localizations/_index';

/** Configuración inicial de la aplicación. */
@Injectable()
export class AppConfig {
  private readonly authService = inject(AuthService);
  private readonly themeColorService = inject(ThemeColorService);
  private readonly localizationService = inject(LocalizationService);
  private readonly userStatesService = inject(UserStatesService);

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.authService.authValue$()) {
        this.userStatesService.load();
      }

      this.themeColorService.initialize();
      this.localizationService.initialize();

      resolve(true);
    });
  }
}
