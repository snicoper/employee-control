import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrls } from '../../../core/urls/site-urls';
import { CompanyTaskAddUsersComponent } from './company-task-add-users/company-task-add-users.component';
import { CompanyTaskDetailsComponent } from './company-task-details/company-task-details.component';
import { CompanyTaskSelectedService } from './company-task-selected.service';
import { CompanyTaskUsersComponent } from './company-task-users/company-task-users.component';
import { EmployeeLoadComponent } from './employee-load-component.model';

@Component({
  selector: 'aw-company-task-view',
  templateUrl: './company-task-view.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
    CompanyTaskDetailsComponent,
    CardComponent,
    TabsModule,
    CompanyTaskUsersComponent,
    CompanyTaskAddUsersComponent
  ]
})
export class CompanyTaskViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);

  readonly companyTask = computed(() => this.companyTaskSelectedService.companyTaskSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: string;

  /** Tab tabUsers, ver que componente mostrar. */
  employeeComponent = EmployeeLoadComponent.employees;
  employeeLoadComponent = EmployeeLoadComponent;

  constructor() {
    this.companyTaskId = this.route.snapshot.paramMap.get('id') as string;
    this.setBreadcrumb();
    this.companyTaskSelectedService.loadData(this.companyTaskId);
  }

  handleChangeComponent(): void {
    this.employeeComponent =
      this.employeeComponent === EmployeeLoadComponent.addEmployees
        ? EmployeeLoadComponent.employees
        : EmployeeLoadComponent.addEmployees;
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrls.companyTasks.list).add('Detalles', SiteUrls.companyTasks.details, '', false);
  }
}
