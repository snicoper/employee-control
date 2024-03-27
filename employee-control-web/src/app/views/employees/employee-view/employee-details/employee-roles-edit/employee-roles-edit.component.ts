import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../../../components/buttons/btn-loading/btn-loading.component';
import { Roles } from '../../../../../core/types/_index';
import { ApiUrls } from '../../../../../core/urls/_index';
import { urlReplaceParams } from '../../../../../core/utils/_index';
import { ResultResponse } from '../../../../../models/_index';
import { EmployeesApiService } from '../../../../../services/api/_index';
import { EmployeeSelectedService } from '../../employee-selected.service';
import { EmployeeRolesRequest } from './employee-roles-request.model';

@Component({
  selector: 'aw-employee-roles-edit',
  templateUrl: './employee-roles-edit.component.html',
  standalone: true,
  imports: [FormsModule, BtnLoadingComponent]
})
export class EmployeeRolesEditComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly toastrService = inject(ToastrService);
  private readonly bsModalRef = inject(BsModalRef);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  isEnterpriseAdmin = false;
  isEnterpriseStaff = false;
  isHumanResources = false;
  isEmployee = false;

  roles = Roles;
  loading = false;

  get fullName(): string {
    return `${this.employeeSelected()?.firstName} ${this.employeeSelected()?.lastName}`;
  }

  constructor() {
    this.isEnterpriseAdmin = this.employeeSelectedService.isInRole(Roles.enterpriseAdmin);
    this.isEnterpriseStaff = this.employeeSelectedService.isInRole(Roles.enterpriseStaff);
    this.isHumanResources = this.employeeSelectedService.isInRole(Roles.humanResources);
    this.isEmployee = this.employeeSelectedService.isInRole(Roles.employee);
  }

  /** Los roles son jerárquicos */
  handChangeValue(roleName: string, value: boolean): void {
    // Si desactiva HumanResources, también desactiva EnterpriseStaff.
    if (Roles.humanResources === roleName && !value && this.isEnterpriseStaff) {
      this.isEnterpriseStaff = false;
    }

    // Si activa EnterpriseStaff, también activa HumanResources.
    if (Roles.enterpriseStaff === roleName && value && !this.isHumanResources) {
      this.isHumanResources = true;
    }
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleSaveChanges(): void {
    this.loading = true;
    const employeeId = this.employeeSelected()?.id as string;
    const url = urlReplaceParams(ApiUrls.employees.updateEmployeeRoles, { id: employeeId });
    const rolesToAdd: EmployeeRolesRequest = { employeeId: employeeId, rolesToAdd: [] };

    if (this.isEnterpriseAdmin) {
      rolesToAdd.rolesToAdd.push(Roles.enterpriseAdmin);
    }

    if (this.isEnterpriseStaff) {
      rolesToAdd.rolesToAdd.push(Roles.enterpriseStaff);
    }

    if (this.isHumanResources) {
      rolesToAdd.rolesToAdd.push(Roles.humanResources);
    }

    rolesToAdd.rolesToAdd.push(Roles.employee);

    this.employeesApiService
      .put<EmployeeRolesRequest, ResultResponse>(rolesToAdd, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.bsModalRef.hide();
            this.toastrService.success('Roles actualizados con éxito');
            this.employeeSelectedService.loadData(employeeId);
          }
        }
      });
  }
}
