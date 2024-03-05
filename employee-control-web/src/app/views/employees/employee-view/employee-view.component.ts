import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { TimeState } from '@aw/models/entities/types/_index';
import { EmployeeSelectedService } from './employee-selected.service';

@Component({
  selector: 'aw-employee-view',
  templateUrl: './employee-view.component.html'
})
export class EmployeeViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());
  readonly employeeTimeControlState = computed(() => this.employeeSelectedService.employeeTimeControlState());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;
  readonly timeStates = TimeState;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.employeeSelectedService.loadData(this.employeeId);
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Empleados', SiteUrls.employees.list).add('Detalles', SiteUrls.employees.details, '', false);
  }
}
