import { Injectable, inject } from '@angular/core';
import {
  CurrentCompanyEmployeeService,
  CurrentCompanySettingsService,
  CurrentTimeControlStateService,
  EmployeeSettingsService
} from './states/_index';

/** Maneja estados de un usuario al hacer login o logout. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly employeeSettingsService = inject(EmployeeSettingsService);

  /** Carga estados del usuario. */
  load(): void {
    this.currentCompanyEmployeeService.refresh();
    this.currentCompanySettingsService.refresh();
    this.currentTimeControlStateService.refresh();
    this.employeeSettingsService.refresh();
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.currentCompanyEmployeeService.clean();
    this.currentCompanySettingsService.clean();
    this.currentTimeControlStateService.clean();
    this.employeeSettingsService.clean();
  }
}
