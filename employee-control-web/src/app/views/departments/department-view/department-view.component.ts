import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
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
    ViewBaseComponent,
    ViewHeaderComponent,
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
