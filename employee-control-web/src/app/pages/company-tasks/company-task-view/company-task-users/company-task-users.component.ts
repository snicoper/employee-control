import { Component, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CompanyTaskViewService } from '../company-task-view.service';
import { CompanyTaskManageUsersComponent } from './company-task-manage-users/company-task-manage-users.component';
import { CompanyTaskUserListComponent } from './company-task-user-list/company-task-user-list.component';

@Component({
  selector: 'aw-company-task-users',
  templateUrl: './company-task-users.component.html',
  standalone: true,
  imports: [MatIcon, MatButton, CompanyTaskUserListComponent, CompanyTaskManageUsersComponent]
})
export class CompanyTaskUsersComponent {
  private readonly companyTaskViewService = inject(CompanyTaskViewService);

  readonly tabSelected = computed(() => this.companyTaskViewService.tabSelected());

  toggleTabSelected(): void {
    this.companyTaskViewService.toggleTabSelected();
  }
}
