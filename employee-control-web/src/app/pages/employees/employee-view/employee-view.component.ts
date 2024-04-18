import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { TimeState } from '../../../models/entities/types/time-state.model';
import { EmployeeDepartmentsComponent } from './employee-departments/employee-departments.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeSelectedService } from './employee-selected.service';
import { EmployeeTasksComponent } from './employee-tasks/employee-tasks.component';
import { EmployeeTimeControlProgressComponent } from './employee-time-control-progress/employee-time-control-progress.component';

@Component({
  selector: 'aw-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatTabsModule,
    PageBaseComponent,
    PageHeaderComponent,
    DotSuccessComponent,
    DotDangerComponent,
    EmployeeDetailsComponent,
    EmployeeDepartmentsComponent,
    EmployeeTasksComponent,
    EmployeeTimeControlProgressComponent
  ]
})
export class EmployeeViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());
  readonly employeeTimeControlState = computed(() => this.employeeSelectedService.employeeTimeControlState());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;
  readonly timeState = TimeState;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.employeeSelectedService.loadData(this.employeeId);
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Empleados', SiteUrl.employees.list).add('Detalles', SiteUrl.employees.details, '', false);
  }
}
