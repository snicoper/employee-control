import { Component, computed, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { DualListBoxItem } from '../../../../../components/dual-list-box/dual-list-box-item.model';
import { DualListBoxComponent } from '../../../../../components/dual-list-box/dual-list-box.component';
import { DualListBox } from '../../../../../components/dual-list-box/dual-list-box.model';
import { ApiUrl } from '../../../../../core/urls/api-urls';
import { CommonUtils } from '../../../../../core/utils/common-utils';
import { ResultResponse } from '../../../../../models/result-response.model';
import { CompanyTaskApiService } from '../../../../../services/api/company-task-api.service';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { CompanyTaskViewService } from '../../company-task-view.service';
import { CompanyTaskManageUsersResponse } from './company-task-add-manage-response.model';

@Component({
  selector: 'aw-company-task-manage-users',
  templateUrl: './company-task-manage-users.component.html',
  standalone: true,
  imports: [DualListBoxComponent]
})
export class CompanyTaskManageUsersComponent {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly companyTaskViewService = inject(CompanyTaskViewService);
  private readonly snackBarService = inject(SnackBarService);

  readonly companyTaskSelected = computed(() => this.companyTaskViewService.companyTaskSelected());
  readonly tabSelected = computed(() => this.companyTaskViewService.tabSelected());

  dualListBoxItems: Array<DualListBoxItem> = [];
  loading = false;

  constructor() {
    this.loadEmployeesUnassigned();
  }

  handleChangeComponent(): void {
    this.companyTaskViewService.toggleTabSelected();
  }

  handleSaveChanges(dualListBox: DualListBox): void {
    if (!dualListBox.itemsToAdd.length) {
      this.handleChangeComponent();
    }

    this.loading = true;

    const companyTaskId = this.companyTaskSelected()?.id as string;
    const employeeIds = dualListBox.itemsToAdd.map((item) => item.id);
    const data = { id: companyTaskId, employeeIds: employeeIds };
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.assignEmployeesToTask, {
      id: companyTaskId
    });

    this.companyTaskApiService
      .post<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.snackBarService.success('Empleados asignados a la tarea con éxito.');
            this.handleChangeComponent();
          }
        }
      });
  }

  /** Carga los empleados que aun no tienen asignada la tarea seleccionada. */
  private loadEmployeesUnassigned(): void {
    this.loading = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.getEmployeesUnassignedTaskByCompanyTaskId, {
      id: this.companyTaskSelected()?.id as string
    });

    this.companyTaskApiService
      .get<CompanyTaskManageUsersResponse[]>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: CompanyTaskManageUsersResponse[]) => {
          result.forEach((item: CompanyTaskManageUsersResponse) => {
            const newItem = { id: item.id, value: item.name, selected: false } as DualListBoxItem;
            this.dualListBoxItems.push(newItem);
          });
        }
      });
  }
}
