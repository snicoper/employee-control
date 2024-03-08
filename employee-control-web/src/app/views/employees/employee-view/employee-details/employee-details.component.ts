import { Component, OnDestroy, computed, inject } from '@angular/core';
import { Roles, roleToHumanReadable } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { ResultResponse } from '@aw/models/_index';
import { TimeState } from '@aw/models/entities/types/_index';
import { JwtService } from '@aw/services/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { DateTime } from 'luxon';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EmployeeSelectedService } from '../employee-selected.service';
import { EmployeeRolesEditComponent } from './employee-roles-edit/employee-roles-edit.component';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnDestroy {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly jwtService = inject(JwtService);
  private readonly bsModalService = inject(BsModalService);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedService.employeeSelectedRoles());

  readonly loadingEmployee = computed(() => this.employeeSelectedService.loadingEmployee());
  readonly loadingEmployeeRoles = computed(() => this.employeeSelectedService.loadingEmployeeRoles());

  readonly employeeTimeControlState = computed(() => this.employeeSelectedService.employeeTimeControlState());

  readonly roleToHumanReadable = roleToHumanReadable;
  readonly siteUrls = SiteUrls;
  readonly roles = Roles;
  readonly timeStates = TimeState;
  readonly dateShort = DateTime.DATE_SHORT;
  readonly currentEmployeeId = this.jwtService.getSid();

  bsModalRef?: BsModalRef;
  loadingUpdateActive = false;

  /** Comprueba si el usuario actual es igual al empleado seleccionado. */
  get canUpdateStates(): boolean {
    return this.jwtService.getSid() !== this.employeeSelected()?.id;
  }

  /** Url para editar empleado. */
  get urlToEdit(): string {
    return urlReplaceParams(SiteUrls.employees.update, { id: this.employeeSelected()?.id as string });
  }

  /** Limpiar el empleado seleccionado. */
  ngOnDestroy(): void {
    this.employeeSelectedService.cleanData();
  }

  /** Establecer estado Active a false del empleado. */
  handleDeactivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeSelected()?.id };
    const url = this.generateApiUrl(ApiUrls.employees.deactivateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Usuario desactivado con éxito');
          this.employeeSelectedService.loadData(this.employeeSelected()?.id as string);
        }
      });
  }

  /** Establecer estado Active a true del empleado. */
  handleActivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeSelected()?.id };
    const url = this.generateApiUrl(ApiUrls.employees.activateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Usuario activado con éxito');
          this.employeeSelectedService.loadData(this.employeeSelected()?.id ?? '');
        }
      });
  }

  handleRolesModalEdit(): void {
    const initialState: ModalOptions = {
      initialState: {}
    };

    this.bsModalRef = this.bsModalService.show(EmployeeRolesEditComponent, initialState);
  }

  /** Wrapper para generar URLs ,de edición de estados. */
  private generateApiUrl(partialUrl: string): string {
    return urlReplaceParams(partialUrl, { id: this.employeeSelected()?.id ?? '' });
  }
}