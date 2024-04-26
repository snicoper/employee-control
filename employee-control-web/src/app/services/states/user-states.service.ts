import { Injectable, inject } from '@angular/core';
import { Role } from '../../core/types/role';
import { JwtService } from '../jwt.service';
import { SignalRService } from '../signalr.service';
import { CompanyEmployeeStateService } from './company-employee-state.service';
import { CompanySettingsStateService } from './company-settings-state.service';
import { CurrentEmployeeStateService } from './current-employee-state.service';
import { EmployeeSettingsStateService } from './employee-settings-state.service';
import { TimeControlIncidencesCountStateService } from './time-control-incidences-count-state.service';
import { UserTimeControlStateService } from './user-time-control-state.service';
import { WorkingDaysWeekStateService } from './working-days-week-state.service';

/** Maneja estados de un usuario al hacer login o logout del usuario actual. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly jwtService = inject(JwtService);
  private readonly signalRService = inject(SignalRService);
  private readonly companyEmployeeStateService = inject(CompanyEmployeeStateService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly userTimeControlStateService = inject(UserTimeControlStateService);
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);
  private readonly currentEmployeeStateService = inject(CurrentEmployeeStateService);

  /** Carga estados del usuario. */
  async load(): Promise<void> {
    return new Promise((resolve) => {
      this.signalRService.start();

      this.companyEmployeeStateService.refresh();
      this.employeeSettingsStateService.refresh();
      this.companySettingsStateService.refresh();
      this.userTimeControlStateService.refresh();
      this.workingDaysWeekStateService.refresh();
      this.currentEmployeeStateService.refresh();

      if (this.jwtService.isInRole(Role.Staff)) {
        this.timeControlIncidencesCountStateService.refresh();
      }

      resolve();
    });
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.signalRService.stop();

    this.companyEmployeeStateService.clean();
    this.employeeSettingsStateService.clean();
    this.companySettingsStateService.clean();
    this.userTimeControlStateService.clean();
    this.workingDaysWeekStateService.clean();
    this.currentEmployeeStateService.clean();

    if (this.jwtService.isInRole(Role.Staff)) {
      this.timeControlIncidencesCountStateService.clean();
    }
  }
}
