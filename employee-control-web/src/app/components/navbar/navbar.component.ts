import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppEnvironments } from '../../core/config/_index';
import { ThemeColors } from '../../core/types/_index';
import { SiteUrls } from '../../core/urls/_index';
import { AuthService, JwtService, LayoutService, ThemeColorService } from '../../services/_index';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive]
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

  readonly sidebarMenuState$ = computed(() => this.layoutService.sidebarMenuState$());
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
