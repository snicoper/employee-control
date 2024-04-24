import { Component, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { DotDangerComponent } from '../../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../../components/colors/dot-success/dot-success.component';
import { Role, roleToHumanReadable } from '../../../../core/types/role';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { RequiredRoleDirective } from '../../../../directives/required-role.directive';
import { TimeState } from '../../../../models/entities/types/time-state.model';
import { ResultResponse } from '../../../../models/result-response.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DateFormatPipe } from '../../../../pipes/date-format.pipe';
import { EmployeesApiService } from '../../../../services/api/employees-api.service';
import { JwtService } from '../../../../services/jwt.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { EmployeeSelectedService } from '../employee-selected.service';
import { EmployeeRolesEditComponent } from './employee-roles-edit/employee-roles-edit.component';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatChipsModule,
    BtnLoadingComponent,
    RequiredRoleDirective,
    DotSuccessComponent,
    DotDangerComponent,
    BtnBackComponent,
    BoolToIconPipe,
    DateFormatPipe
  ]
})
export class EmployeeDetailsComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly jwtService = inject(JwtService);
  private readonly matDialog = inject(MatDialog);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedService.employeeSelectedRoles());
  readonly loadingEmployee = computed(() => this.employeeSelectedService.loadingEmployee());
  readonly loadingEmployeeRoles = computed(() => this.employeeSelectedService.loadingEmployeeRoles());
  readonly employeeTimeControlState = computed(() => this.employeeSelectedService.employeeTimeControlState());

  readonly roleToHumanReadable = roleToHumanReadable;
  readonly siteUrl = SiteUrl;
  readonly role = Role;
  readonly timeStates = TimeState;
  readonly dateShort = DateTime.DATE_SHORT;
  readonly currentEmployeeId = this.jwtService.getSid();

  loadingUpdateActive = false;

  /** Comprueba si el usuario actual es igual al empleado seleccionado. */
  get canUpdateStates(): boolean {
    return this.jwtService.getSid() !== this.employeeSelected()?.id;
  }

  /** Url para editar empleado. */
  get urlToEdit(): string {
    return CommonUtils.urlReplaceParams(SiteUrl.employees.update, { id: this.employeeSelected()?.id as string });
  }

  /** Establecer estado Active a false del empleado. */
  handleDeactivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeSelected()?.id };
    const url = this.generateApiUrl(ApiUrl.employees.deactivateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Usuario desactivado con éxito');
          this.employeeSelectedService.loadData(this.employeeSelected()?.id as string);
        }
      });
  }

  /** Establecer estado Active a true del empleado. */
  handleActivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeSelected()?.id };
    const url = this.generateApiUrl(ApiUrl.employees.activateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Usuario activado con éxito');
          this.employeeSelectedService.loadData(this.employeeSelected()?.id ?? '');
        }
      });
  }

  handleEditRolesDialog(): void {
    this.matDialog.open(EmployeeRolesEditComponent);
  }

  /** Wrapper para generar URLs de edición de estados. */
  private generateApiUrl(partialUrl: string): string {
    return CommonUtils.urlReplaceParams(partialUrl, { id: this.employeeSelected()?.id ?? '' });
  }
}
