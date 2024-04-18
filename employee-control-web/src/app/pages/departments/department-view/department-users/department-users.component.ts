import { Component, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DepartmentSelectedService } from '../department-selected.service';
import { DepartmentManageUsersComponent } from './department-manage-users/department-manage-users.component';
import { DepartmentUserListComponent } from './department-user-list/department-user-list.component';

@Component({
  selector: 'aw-department-users',
  templateUrl: './department-users.component.html',
  standalone: true,
  imports: [MatButton, MatIcon, DepartmentUserListComponent, DepartmentManageUsersComponent]
})
export class DepartmentUsersComponent {
  private readonly departmentSelectedService = inject(DepartmentSelectedService);

  readonly tabSelected = computed(() => this.departmentSelectedService.tabSelected());

  toggleTabSelected(): void {
    this.departmentSelectedService.toggleTabSelected();
  }
}
