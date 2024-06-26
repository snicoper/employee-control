import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Role } from '../../../core/types/role';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { UserRole } from '../../../models/entities/user-role.model';
import { TimeControlStateResponse } from '../../../models/states/time-control-state-response.model';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { EmployeeSelectedResponse } from './employee-selected-response.model';

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

  private readonly employeeSelected$ = signal<EmployeeSelectedResponse | null>(null);
  private readonly employeeSelectedRoles$ = signal<UserRole[]>([]);
  private readonly timeControlStateResponse$ = signal<TimeControlStateResponse | null>(null);
  private readonly loadingEmployee$ = signal(false);
  private readonly loadingEmployeeRoles$ = signal(false);
  private readonly loadingEmployeeTimeControlState$ = signal(false);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedRoles$());
  readonly employeeTimeControlState = computed(() => this.timeControlStateResponse$());
  readonly loadingEmployee = computed(() => this.loadingEmployee$());
  readonly loadingEmployeeRoles = computed(() => this.loadingEmployeeRoles$());
  readonly loadingEmployeeTimeControlState = computed(() => this.loadingEmployeeTimeControlState$());

  isInRole(role: Role): boolean {
    const index = this.employeeSelectedRoles$().findIndex((r) => r.name === role);

    return index >= 0;
  }

  clean(): void {
    this.employeeSelected$.set(null);
    this.employeeSelectedRoles$.set([]);
    this.timeControlStateResponse$.set(null);
  }

  loadData(employeeId: string): void {
    this.loadingEmployee$.set(true);
    this.loadingEmployeeRoles$.set(true);
    this.loadingEmployeeTimeControlState$.set(true);

    const urlEmployee = CommonUtils.urlReplaceParams(ApiUrl.employees.getEmployeeById, { id: employeeId });
    const urlEmployeeRoles = `${urlEmployee}/roles`;
    const urlTimeState = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeStateOpenByEmployeeId, {
      employeeId: employeeId
    });

    this.timeControlApiService
      .get<TimeControlStateResponse>(urlTimeState)
      .pipe(finalize(() => this.loadingEmployeeTimeControlState$.set(false)))
      .subscribe({
        next: (result) => this.timeControlStateResponse$.set(result)
      });

    this.employeesApiService
      .get<EmployeeSelectedResponse>(urlEmployee)
      .pipe(finalize(() => this.loadingEmployee$.set(false)))
      .subscribe({
        next: (result: EmployeeSelectedResponse) => this.employeeSelected$.set(result)
      });

    this.employeesApiService
      .get<UserRole[]>(urlEmployeeRoles)
      .pipe(finalize(() => this.loadingEmployeeRoles$.set(false)))
      .subscribe({
        next: (result: UserRole[]) => this.employeeSelectedRoles$.set(result)
      });
  }
}
