import { Component, OnDestroy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../../components/colors/dot-success/dot-success.component';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { TableLoadingComponent } from '../../../../components/tables/table-loading/table-loading.component';
import { Roles, roleToHumanReadable } from '../../../../core/types/roles';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../../core/utils/common-utils';
import { RequiredRoleDirective } from '../../../../directives/required-role.directive';
import { TimeState } from '../../../../models/entities/types/time-state.model';
import { ResultResponse } from '../../../../models/result-response.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DatetimePipe } from '../../../../pipes/datetime.pipe';
import { EmployeesApiService } from '../../../../services/api/employees-api.service';
import { JwtService } from '../../../../services/jwt.service';
import { EmployeeSelectedService } from '../employee-selected.service';
import { EmployeeRolesEditComponent } from './employee-roles-edit/employee-roles-edit.component';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html',
  standalone: true,
  imports: [
    CardComponent,
    BtnLoadingComponent,
    SpinnerComponent,
    RequiredRoleDirective,
    DotSuccessComponent,
    DotDangerComponent,
    TableLoadingComponent,
    BtnBackComponent,
    RouterLink,
    BoolToIconPipe,
    DatetimePipe
  ]
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
