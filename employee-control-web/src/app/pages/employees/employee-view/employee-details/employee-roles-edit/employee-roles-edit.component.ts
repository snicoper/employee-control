import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../../../components/buttons/btn-loading/btn-loading.component';
import { Role } from '../../../../../core/types/role';
import { ApiUrl } from '../../../../../core/urls/api-urls';
import { CommonUtils } from '../../../../../core/utils/common-utils';
import { ResultResponse } from '../../../../../models/result-response.model';
import { EmployeesApiService } from '../../../../../services/api/employees-api.service';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { EmployeeSelectedService } from '../../employee-selected.service';
import { EmployeeRolesRequest } from './employee-roles-request.model';

@Component({
  selector: 'aw-employee-roles-edit',
  templateUrl: './employee-roles-edit.component.html',
  styleUrl: './employee-roles-edit.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIcon,
    MatDivider,
    BtnLoadingComponent
  ]
})
export class EmployeeRolesEditComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly dialogRef = inject(MatDialogRef<EmployeeRolesEditComponent>);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  isAdmin = false;
  isStaff = false;
  isHumanResources = false;
  isEmployee = false;
  role = Role;
  loading = false;
  fullName: string;

  constructor() {
    this.isAdmin = this.employeeSelectedService.isInRole(Role.Admin);
    this.isStaff = this.employeeSelectedService.isInRole(Role.Staff);
    this.isHumanResources = this.employeeSelectedService.isInRole(Role.HumanResources);
    this.isEmployee = this.employeeSelectedService.isInRole(Role.Employee);
    this.fullName = `${this.employeeSelected()?.firstName} ${this.employeeSelected()?.lastName}`;
  }

  /** Los roles son jerárquicos */
  handleChangeValue(roleName: string, value: boolean): void {
    // Si desactiva HumanResources, también desactiva EnterpriseStaff.
    if (Role.HumanResources === roleName && !value && this.isStaff) {
      this.isStaff = false;
    }

    // Si activa Staff, también activa HumanResources.
    if (Role.Staff === roleName && value && !this.isHumanResources) {
      this.isHumanResources = true;
    }
  }

  handleSaveChanges(): void {
    this.loading = true;
    const employeeId = this.employeeSelected()?.id as string;
    const url = CommonUtils.urlReplaceParams(ApiUrl.employees.updateEmployeeRoles, { id: employeeId });
    const rolesToAdd: EmployeeRolesRequest = { employeeId: employeeId, rolesToAdd: [] };

    if (this.isAdmin) {
      rolesToAdd.rolesToAdd.push(Role.Admin);
    }

    if (this.isStaff) {
      rolesToAdd.rolesToAdd.push(Role.Staff);
    }

    if (this.isHumanResources) {
      rolesToAdd.rolesToAdd.push(Role.HumanResources);
    }

    rolesToAdd.rolesToAdd.push(Role.Employee);

    this.employeesApiService
      .put<EmployeeRolesRequest, ResultResponse>(rolesToAdd, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.snackBarService.success('Roles actualizados con éxito');
            this.employeeSelectedService.loadData(employeeId);
            this.dialogRef.close();
          }
        }
      });
  }
}
