import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TimeState } from '../../models/entities/types/time-state.model';
import { JwtService } from '../../services/jwt.service';
import { SidenavService } from '../../services/sidenav.service';
import { CompanyEmployeeStateService } from '../../services/states/company-employee-state.service';
import { UserTimeControlStateService } from '../../services/states/user-time-control-state.service';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'aw-sidenav',
  standalone: true,
  imports: [NgClass, RouterLink, MatSidenavModule, SidenavMenuComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private readonly jwtService = inject(JwtService);
  private readonly companyEmployeeStateService = inject(CompanyEmployeeStateService);
  private readonly userTimeControlStateService = inject(UserTimeControlStateService);
  private readonly sidenavService = inject(SidenavService);

  readonly sidenavState = computed(() => this.sidenavService.sidenavState());
  readonly sidenavToolbarState = computed(() => this.sidenavService.sidenavToolbarState());
  readonly currentTimeControl = computed(() => this.userTimeControlStateService.timeControl());

  readonly timeStates = TimeState;

  get username(): string {
    return this.jwtService.getName();
  }

  get companyName(): string {
    return this.companyEmployeeStateService.get()?.name as string;
  }
}
