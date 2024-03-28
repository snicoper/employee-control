import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { RequiredRoleDirective } from '../../../directives/required-role.directive';
import { TimeState } from '../../../models/entities/types/time-state.model';
import { JwtService } from '../../../services/jwt.service';
import { CurrentCompanyEmployeeStateService } from '../../../services/states/current-company-employee-state.service';
import { CurrentTimeControlStateService } from '../../../services/states/current-time-control-state.service';
import { SidebarMenu, SidebarMenuTypes } from './sidebar-menu-types.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ],
  standalone: true,
  imports: [NgScrollbar, NgClass, RequiredRoleDirective, RouterLinkActive, RouterLink]
})
export class SidebarComponent {
  private readonly jwtService = inject(JwtService);
  private readonly sidebarService = inject(SidebarService);
  private readonly currentCompanyEmployeeStateService = inject(CurrentCompanyEmployeeStateService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);

  readonly currentTimeControl = computed(() => this.currentTimeControlStateService.currentTimeControl());

  readonly sidebarMenus: SidebarMenu[];
  readonly sidebarMenuTypes = SidebarMenuTypes;
  readonly timeStates = TimeState;

  constructor() {
    this.sidebarMenus = this.sidebarService.getMenuList();
  }

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.currentCompanyEmployeeStateService.get()?.name as string;
  }

  toggle(currentMenu: SidebarMenu): void {
    if (currentMenu.type === this.sidebarMenuTypes.dropdown) {
      this.sidebarService.activeMenu(currentMenu.title);
    }
  }

  getState(currentMenu: SidebarMenu): string {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
