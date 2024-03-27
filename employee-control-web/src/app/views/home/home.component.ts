import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';
import { Roles, ThemeColors } from '../../core/types/_index';
import { JwtService, LayoutService, ThemeColorService } from '../../services/_index';

@Component({
  selector: 'aw-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [ViewBaseComponent, NgClass]
})
export class HomeComponent {
  readonly layoutService = inject(LayoutService);
  private readonly jwtService = inject(JwtService);
  private readonly themeColorService = inject(ThemeColorService);

  readonly roles = Roles;

  getUserId(): string {
    return this.jwtService.getSid();
  }

  getUserName(): string {
    return this.jwtService.getName();
  }

  getRoles(): string[] {
    return this.jwtService.getRoles();
  }

  getCompanyId(): string {
    return this.jwtService.getCompanyId();
  }

  handleLogOut(): void {
    this.jwtService.removeTokens();
  }

  handleToggleNavbar(): void {
    this.layoutService.navbarState$.update((value) => !value);
  }

  handleToggleSidebar(): void {
    this.layoutService.sidebarMenuState$.update((value) => !value);
  }

  handleToggleFooter(): void {
    this.layoutService.footerState$.update((value) => !value);
  }

  handleChangeThemeColor(): void {
    const color = this.themeColorService.getThemeValue() === ThemeColors.dark ? ThemeColors.light : ThemeColors.dark;
    this.themeColorService.setTheme(color);
  }
}
