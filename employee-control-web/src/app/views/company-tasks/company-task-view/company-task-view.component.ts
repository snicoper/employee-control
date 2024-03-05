import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { CompanyTaskSelectedService } from './company-task-selected.service';
import { EmployeeLoadComponent } from './employee-load-component.model';

@Component({
  selector: 'aw-company-task-view',
  templateUrl: './company-task-view.component.html'
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
