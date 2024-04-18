import { Component, computed, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { DualListBoxItem } from '../../../../../components/dual-list-box/dual-list-box-item.model';
import { DualListBoxComponent } from '../../../../../components/dual-list-box/dual-list-box.component';
import { DualListBox } from '../../../../../components/dual-list-box/dual-list-box.model';
import { ApiUrl } from '../../../../../core/urls/api-urls';
import { CommonUtils } from '../../../../../core/utils/common-utils';
import { ResultResponse } from '../../../../../models/result-response.model';
import { DepartmentApiService } from '../../../../../services/api/department-api.service';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { DepartmentSelectedService } from '../../department-selected.service';
import { DepartmentManageUserResponse } from './department-manage-user-response.model';

@Component({
  selector: 'aw-department-manage-users',
  templateUrl: './department-manage-users.component.html',
  standalone: true,
  imports: [DualListBoxComponent]
})
export class DepartmentManageUsersComponent {
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly snackBarService = inject(SnackBarService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());
  readonly tabSelected = computed(() => this.departmentSelectedService.tabSelected());

  dualListBoxItems: Array<DualListBoxItem> = [];
  loading = false;

  constructor() {
    this.loadEmployees();
  }

  handleChangeComponent(): void {
    this.departmentSelectedService.toggleTabSelected();
  }

  handleSaveChanges(dualListBox: DualListBox): void {
    if (!dualListBox.itemsToAdd.length) {
      this.handleChangeComponent();
    }

    this.loading = true;

    const departmentId = this.departmentSelected()?.id as string;
    const employeeIds = dualListBox.itemsToAdd.map((item) => item.id);
    const data = { id: departmentId, employeeIds: employeeIds };
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.assignEmployeesToDepartment, {
      id: departmentId
    });

    this.departmentApiService
      .post<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.snackBarService.success('Empleados asignados al departamento con éxito.');
            this.handleChangeComponent();
          }
        }
      });
  }

  private loadEmployees(): void {
    this.loading = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.GetEmployeesByDepartmentIdPaginated, {
      id: this.departmentSelected()?.id as string
    });

    this.departmentApiService
      .get<DepartmentManageUserResponse[]>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: DepartmentManageUserResponse[]) => {
          result.forEach((item: DepartmentManageUserResponse) => {
            const newItem = { id: item.id, value: item.name, selected: false } as DualListBoxItem;
            this.dualListBoxItems.push(newItem);
          });
        }
      });
  }
}
