import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { BrowserStorageKey } from '../../core/types/browser-storage-key';
import { RequiredRoleDirective } from '../../directives/required-role.directive';
import { TimeState } from '../../models/entities/types/time-state.model';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { JwtService } from '../../services/jwt.service';
import { CompanyEmployeeStateService } from '../../services/states/company-employee-state.service';
import { UserTimeControlStateService } from '../../services/states/user-time-control-state.service';
import { sidenavMenu } from './sidenav-menu';
import { SidenavMenu, SidenavMenuType, SidenavSubMenu } from './sidenav-menu-type.model';

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

  sidenavState = input.required<boolean>();

  readonly currentTimeControl = computed(() => this.userTimeControlStateService.timeControl());

  readonly sidenavMenus: Array<SidenavMenu>;
  readonly sidebarMenuType = SidenavMenuType;
  readonly timeStates = TimeState;

  constructor() {
    this.sidenavMenus = this.getSidebarMenu() ?? sidenavMenu;
    this.storeSidebarMenu();
  }

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.companyEmployeeStateService.get()?.name as string;
  }

  handleChangeMenuState(): void {
    this.storeSidebarMenu();
  }

  handleChangeSubMenuState(sidebarMenu: SidenavMenu, sidebarSubMenu: SidenavSubMenu): void {
    this.sidenavMenus.forEach((sm) => {
      if (sm.title === sidebarMenu.title) {
        sm.submenus?.forEach((subMenu) => {
          subMenu.active = sidebarSubMenu.title === subMenu.title;
        });
      }
    });

    this.storeSidebarMenu();
  }

  private storeSidebarMenu(): void {
    this.browserStorageService.setObject<Array<SidenavMenu>>(BrowserStorageKey.Sidebar, this.sidenavMenus);
  }

  private getSidebarMenu(): Array<SidenavMenu> {
    return this.browserStorageService.getParse<Array<SidenavMenu>>(BrowserStorageKey.Sidebar);
  }
}
