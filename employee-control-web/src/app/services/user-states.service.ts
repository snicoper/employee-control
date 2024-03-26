import { Injectable, inject } from '@angular/core';
import {
  CurrentCompanyEmployeeStateService,
  CurrentCompanySettingsStateService,
  CurrentTimeControlStateService,
  EmployeeSettingsStateService
} from './states/_index';

/** Maneja estados de un usuario al hacer login o logout. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly currentCompanyEmployeeStateService = inject(CurrentCompanyEmployeeStateService);
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);

  /** Carga estados del usuario. */
  load(): void {
    this.currentCompanyEmployeeStateService.refresh();
    this.currentCompanySettingsStateService.refresh();
    this.currentTimeControlStateService.refresh();
    this.employeeSettingsStateService.refresh();
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.currentCompanyEmployeeStateService.clean();
    this.currentCompanySettingsStateService.clean();
    this.currentTimeControlStateService.clean();
    this.employeeSettingsStateService.clean();
  }
}
