import { Component, computed, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AppEnvironment } from '../../core/config/app-environment';
import { ThemeColor } from '../../core/types/theme-color';
import { SiteUrl } from '../../core/urls/site-urls';
import { ThemeManagerService } from '../../services/theme-manager.service';

@Component({
  selector: 'aw-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly themeManagerService = inject(ThemeManagerService);

  changeSidenavState = output<void>();

  readonly theme = computed(() => this.themeManagerService.theme());

  themeColor = ThemeColor;
  siteName = AppEnvironment.siteName;
  siteUrl = SiteUrl;

  /** Alternar color del theme. */
  handleToggleThemeColor(): void {
    this.themeManagerService.toggle();
  }

  /** Emitir cambio de estado de sidenav. */
  handleToggleSidenavState(): void {
    this.changeSidenavState.emit();
  }
}
