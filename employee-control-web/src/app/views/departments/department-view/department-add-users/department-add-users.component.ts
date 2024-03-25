import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { DualListBox } from '@aw/components/dual-list-box/dual-list-box.model';
import { HtmlItemSelector } from '@aw/core/models/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { ResultResponse } from '@aw/models/result-response.model';
import { DepartmentApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { DualListBoxComponent } from '../../../../components/dual-list-box/dual-list-box.component';
import { DepartmentSelectedService } from '../department-selected.service';
import { DepartmentAddUserResponse } from './department-add-user-response.model';

@Component({
  selector: 'aw-department-add-users',
  templateUrl: './department-add-users.component.html',
  standalone: true,
  imports: [DualListBoxComponent]
})
export class DepartmentAddUsersComponent {
  @Output() changeComponent = new EventEmitter();

  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly toastrService = inject(ToastrService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());

  htmlItemSelector: HtmlItemSelector[] = [];
  loading = false;

  constructor() {
    this.loadEmployees();
  }

  handleChangeComponent(): void {
    this.changeComponent.emit();
  }

  handleSaveChanges(dualListBox: DualListBox): void {
    if (!dualListBox.itemsToAdd.length) {
      this.handleChangeComponent();
    }

    this.loading = true;

    const departmentId = this.departmentSelected()?.id as string;
    const employeeIds = dualListBox.itemsToAdd.map((item) => item.id);
    const data = { id: departmentId, employeeIds: employeeIds };
    const url = urlReplaceParams(ApiUrls.departments.assignEmployeesToDepartment, {
      id: departmentId
    });

    this.departmentApiService
      .post<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Empleados asignados al departamento con éxito.');
            this.handleChangeComponent();
          }
        }
      });
  }

  private loadEmployees(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.departments.GetEmployeesByDepartmentIdPaginated, {
      id: this.departmentSelected()?.id as string
    });

    this.departmentApiService
      .get<DepartmentAddUserResponse[]>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: DepartmentAddUserResponse[]) => {
          result.forEach((item: DepartmentAddUserResponse) => {
            const newItem = { id: item.id, value: item.name, selected: false } as HtmlItemSelector;
            this.htmlItemSelector.push(newItem);
          });
        }
      });
  }
}
