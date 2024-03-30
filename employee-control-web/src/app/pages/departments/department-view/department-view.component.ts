import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrls } from '../../../core/urls/site-urls';
import { DepartmentAddUsersComponent } from './department-add-users/department-add-users.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentSelectedService } from './department-selected.service';
import { DepartmentUsersComponent } from './department-users/department-users.component';
import { EmployeeLoadComponent } from './employee-load-component.model';

@Component({
  selector: 'aw-department-view',
  templateUrl: './department-view.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
    DepartmentDetailsComponent,
    CardComponent,
    TabsModule,
    DepartmentUsersComponent,
    DepartmentAddUsersComponent
  ]
})
export class DepartmentViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly departmentId: string;

  /** Tab tabUsers, ver que componente mostrar. */
  employeeComponent = EmployeeLoadComponent.employees;
  employeeLoadComponent = EmployeeLoadComponent;

  constructor() {
    this.departmentId = this.route.snapshot.paramMap.get('id') as string;
    this.departmentSelectedService.loadDepartmentById(this.departmentId);
    this.setBreadcrumb();
  }

  handleChangeComponent(): void {
    this.employeeComponent =
      this.employeeComponent === EmployeeLoadComponent.addEmployees
        ? EmployeeLoadComponent.employees
        : EmployeeLoadComponent.addEmployees;
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Departamentos', SiteUrls.departments.list)
      .add('Detalles', SiteUrls.departments.details, '', false);
  }
}
