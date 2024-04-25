import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserStatesService } from '../../services/states/user-states.service';
import { ThemeManagerService } from '../../services/theme-manager.service';
import { LocalizationService } from '../features/localizations/localization.service';

/** Configuración inicial de la aplicación. */
@Injectable()
export class AppConfig {
  private readonly authService = inject(AuthService);
  private readonly themeManagerService = inject(ThemeManagerService);
  private readonly localizationService = inject(LocalizationService);
  private readonly userStatesService = inject(UserStatesService);

  load(): Promise<void> {
    return new Promise((resolve) => {
      this.themeManagerService.initialize();
      this.localizationService.initialize();

      if (this.authService.authValue$()) {
        this.userStatesService.load().then(() => {
          resolve();
        });
      }

      resolve();
    });
  }
}
