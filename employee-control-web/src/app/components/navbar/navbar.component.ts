import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnvironments } from '@aw/core/config/_index';
import { ThemeColors } from '@aw/core/types/_index';
import { SiteUrls } from '@aw/core/urls/_index';
import { AuthService, JwtService, LayoutService, ThemeColorService } from '@aw/services/_index';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly jwtService = inject(JwtService);
  private readonly authService = inject(AuthService);
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly themeColorService = inject(ThemeColorService);

  readonly userName = this.jwtService.getName();
  readonly siteName = AppEnvironments.siteName;
  readonly siteUrls = SiteUrls;

  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());
  readonly authState$ = computed(() => this.authService.authValue$);
  readonly theme = computed(() => this.themeColorService.theme());

  themeColors = ThemeColors;

  toggleSidebarState(): void {
    this.layoutService.toggleSidebarState();
  }

  handleChangeTheme(): void {
    this.themeColorService.toggle();
  }

  logOut(): void {
    this.router.navigateByUrl(SiteUrls.auth.login);
  }
}
