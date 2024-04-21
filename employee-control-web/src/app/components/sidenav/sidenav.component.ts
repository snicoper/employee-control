import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { BrowserStorageKey } from '../../core/types/browser-storage-key';
import { Role } from '../../core/types/role';
import { SiteUrl } from '../../core/urls/site-urls';
import { RequiredRoleDirective } from '../../directives/required-role.directive';
import { TimeState } from '../../models/entities/types/time-state.model';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { JwtService } from '../../services/jwt.service';
import { CompanyEmployeeStateService } from '../../services/states/company-employee-state.service';
import { TimeControlIncidencesCountStateService } from '../../services/states/time-control-incidences-count-state.service';
import { UserTimeControlStateService } from '../../services/states/user-time-control-state.service';
import { SidenavMenu, SidenavMenuItem, SidenavMenus } from './sidenav-menu';
@Component({
  selector: 'aw-sidenav',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule,
    RequiredRoleDirective
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private readonly jwtService = inject(JwtService);
  private readonly companyEmployeeStateService = inject(CompanyEmployeeStateService);
  private readonly userTimeControlStateService = inject(UserTimeControlStateService);
  private readonly browserStorageService = inject(BrowserStorageService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  readonly sidenavState = input.required<boolean>();

  readonly currentTimeControl = computed(() => this.userTimeControlStateService.timeControl());
  readonly timeControlIncidencesCount = computed(() => this.timeControlIncidencesCountStateService.incidences());

  private readonly sidenavMenu: SidenavMenu;

  readonly timeStates = TimeState;
  readonly role = Role;
  readonly siteUrl = SiteUrl;

  constructor() {
    this.sidenavMenu = this.browserStorageService.getParse<SidenavMenu>(BrowserStorageKey.Sidenav) ?? SidenavMenus;
  }

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.companyEmployeeStateService.get()?.name as string;
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
