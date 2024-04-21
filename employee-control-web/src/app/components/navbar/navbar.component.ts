import { Component, computed, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AppEnvironment } from '../../core/config/app-environment';
import { Role } from '../../core/types/role';
import { ThemeColor } from '../../core/types/theme-color';
import { SiteUrl } from '../../core/urls/site-urls';
import { RequiredRoleDirective } from '../../directives/required-role.directive';
import { JwtService } from '../../services/jwt.service';
import { ThemeManagerService } from '../../services/theme-manager.service';

@Component({
  selector: 'aw-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RequiredRoleDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly themeManagerService = inject(ThemeManagerService);
  private readonly jwtService = inject(JwtService);

  readonly changeSidenavState = output<void>();

  readonly theme = computed(() => this.themeManagerService.theme());

  readonly themeColor = ThemeColor;
  readonly siteName = AppEnvironment.siteName;
  readonly siteUrl = SiteUrl;
  readonly role = Role;
  readonly userName = this.jwtService.getName();

  /** Alternar color del theme. */
  handleToggleThemeColor(): void {
    this.themeManagerService.toggle();
  }

  /** Emitir cambio de estado de sidenav. */
  handleToggleSidenavState(): void {
    this.changeSidenavState.emit();
  }
}
