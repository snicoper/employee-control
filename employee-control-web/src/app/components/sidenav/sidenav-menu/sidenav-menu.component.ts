import { Component, computed, inject, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { BrowserStorageKey } from '../../../core/types/browser-storage-key';
import { Role } from '../../../core/types/role';
import { SiteUrl } from '../../../core/urls/site-urls';
import { RequiredRoleDirective } from '../../../directives/required-role.directive';
import { BrowserStorageService } from '../../../services/browser-storage.service';
import { TimeControlIncidencesCountStateService } from '../../../services/states/time-control-incidences-count-state.service';
import { SidenavMenu, SidenavMenuItem, SidenavMenus } from './sidenav-menu';

@Component({
  selector: 'aw-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    RequiredRoleDirective
  ]
})
export class SidenavMenuComponent {
  private readonly browserStorageService = inject(BrowserStorageService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  readonly timeControlIncidencesCount = computed(() => this.timeControlIncidencesCountStateService.incidences());

  readonly sidenavState = input.required<boolean>();

  private readonly sidenavMenu: SidenavMenu;
  readonly role = Role;
  readonly siteUrl = SiteUrl;

  constructor() {
    this.sidenavMenu = this.browserStorageService.getParse<SidenavMenu>(BrowserStorageKey.Sidenav) ?? SidenavMenus;
  }

  stateSidebarMenu(sidebarMenu: string): boolean {
    const item = this.getSidenavMenuItem(sidebarMenu);

    return item ? item.open : false;
  }

  handleOpenExpansionPanel(name: string): void {
    const sidebarMenuItem = this.getSidenavMenuItem(name);

    if (!sidebarMenuItem) {
      return;
    }

    sidebarMenuItem.open = true;
    this.saveSidenavState();
  }

  handleClosedExpansionPanel(name: string): void {
    const sidebarMenuItem = this.getSidenavMenuItem(name);

    if (!sidebarMenuItem) {
      return;
    }

    sidebarMenuItem.open = false;
    this.saveSidenavState();
  }

  private getSidenavMenuItem(name: string): SidenavMenuItem | undefined {
    const sidebarMenuItem = this.sidenavMenu.find((item: SidenavMenuItem) => item.name === name);

    return sidebarMenuItem;
  }

  private saveSidenavState(): void {
    this.browserStorageService.setObject(BrowserStorageKey.Sidenav, this.sidenavMenu);
  }
}
