import { Injectable, inject } from '@angular/core';
import { Roles } from '../../core/types/roles';
import { JwtService } from '../jwt.service';
import { SignalRService } from '../signalr.service';
import { CompanyEmployeeStateService } from './company-employee-state.service';
import { CompanySettingsStateService } from './company-settings-state.service';
import { EmployeeSettingsStateService } from './employee-settings-state.service';
import { TimeControlIncidencesCountStateService } from './time-control-incidences-count-state.service';
import { UserTimeControlStateService } from './user-time-control-state.service';

/** Maneja estados de un usuario al hacer login o logout, usuario actual. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly jwtService = inject(JwtService);
  private readonly signalRService = inject(SignalRService);
  private readonly companyEmployeeStateService = inject(CompanyEmployeeStateService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly userTimeControlStateService = inject(UserTimeControlStateService);
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  /** Carga estados del usuario. */
  load(): void {
    this.signalRService.start();

    this.companyEmployeeStateService.refresh();
    this.employeeSettingsStateService.refresh();
    this.companySettingsStateService.refresh();
    this.userTimeControlStateService.refresh();

    if (this.jwtService.isInRole(Roles.enterpriseStaff)) {
      this.timeControlIncidencesCountStateService.refresh();
    }
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.signalRService.stop();

    this.companyEmployeeStateService.clean();
    this.employeeSettingsStateService.clean();
    this.companySettingsStateService.clean();
    this.userTimeControlStateService.clean();

    if (this.jwtService.isInRole(Roles.enterpriseStaff)) {
      this.timeControlIncidencesCountStateService.clean();
    }
  }
}
