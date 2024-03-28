import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Roles } from '../../../core/types/roles';
import { ApiUrls } from '../../../core/urls/api-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { CurrentTimeControlResponse } from '../../../models/current-time-control-response.model';
import { UserRole } from '../../../models/entities/user-role.model';
import { User } from '../../../models/entities/user.model';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';

/**
 * Empleado seleccionado desde la lista (employee-list).
 *
 * Contiene estados del usuario seleccionado, roles y estado actual en el
 * control de tiempos.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeSelectedService {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly employeeSelected$ = signal<User | null>(null);
  private readonly employeeSelectedRoles$ = signal<UserRole[]>([]);
  private readonly employeeTimeControlState$ = signal<CurrentTimeControlResponse | null>(null);

  private readonly loadingEmployee$ = signal(false);
  private readonly loadingEmployeeRoles$ = signal(false);
  private readonly loadingEmployeeTimeControlState$ = signal(false);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedRoles$());

  readonly loadingEmployee = computed(() => this.loadingEmployee$());
  readonly loadingEmployeeRoles = computed(() => this.loadingEmployeeRoles$());

  readonly employeeTimeControlState = computed(() => this.employeeTimeControlState$());
  readonly loadingEmployeeTimeControlState = computed(() => this.loadingEmployeeTimeControlState$());

  isInRole(role: Roles): boolean {
    const index = this.employeeSelectedRoles$().findIndex((r) => r.name === role);

    return index >= 0;
  }

  cleanData(): void {
    this.employeeSelected$.set(null);
    this.employeeSelectedRoles$.set([]);
    this.employeeTimeControlState$.set(null);
  }

  loadData(employeeId: string): void {
    this.loadingEmployee$.set(true);
    this.loadingEmployeeRoles$.set(true);
    this.loadingEmployeeTimeControlState$.set(true);

    const urlEmployee = urlReplaceParams(ApiUrls.employees.getEmployeeById, { id: employeeId });
    const urlEmployeeRoles = `${urlEmployee}/roles`;
    const urlTimeState = urlReplaceParams(ApiUrls.timeControl.getTimeStateOpenByEmployeeId, { employeeId: employeeId });

    this.timeControlApiService
      .get<CurrentTimeControlResponse>(urlTimeState)
      .pipe(finalize(() => this.loadingEmployeeTimeControlState$.set(false)))
      .subscribe({
        next: (result) => this.employeeTimeControlState$.set(result)
      });

    this.employeesApiService
      .get<User>(urlEmployee)
      .pipe(finalize(() => this.loadingEmployee$.set(false)))
      .subscribe({
        next: (result: User) => this.employeeSelected$.set(result)
      });

    this.employeesApiService
      .get<UserRole[]>(urlEmployeeRoles)
      .pipe(finalize(() => this.loadingEmployeeRoles$.set(false)))
      .subscribe({
        next: (result: UserRole[]) => this.employeeSelectedRoles$.set(result)
      });
  }
}
