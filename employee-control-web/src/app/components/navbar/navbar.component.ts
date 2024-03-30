import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppEnvironments } from '../../core/config/app-environments';
import { Roles } from '../../core/types/roles';
import { ThemeColors } from '../../core/types/theme-colors';
import { SiteUrls } from '../../core/urls/site-urls';
import { RequiredRoleDirective } from '../../directives/required-role.directive';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { LayoutService } from '../../services/layout.service';
import { TimeControlIncidencesCountStateService } from '../../services/states/time-control-incidences-count-state.service';
import { ThemeColorService } from '../../services/theme-color.service';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, RequiredRoleDirective]
})
export class NavbarComponent {
  private readonly jwtService = inject(JwtService);
  private readonly authService = inject(AuthService);
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly themeColorService = inject(ThemeColorService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  readonly userName = this.jwtService.getName();
  readonly siteName = AppEnvironments.siteName;
  readonly siteUrls = SiteUrls;

  readonly sidebarMenuState$ = computed(() => this.layoutService.sidebarMenuState$());
  readonly authState$ = computed(() => this.authService.authValue$);
  readonly theme = computed(() => this.themeColorService.theme());
  readonly timeControlIncidencesCount = computed(() => this.timeControlIncidencesCountStateService.incidences());

  themeColors = ThemeColors;
  roles = Roles;

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
