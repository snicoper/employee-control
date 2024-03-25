import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { TimeState } from '@aw/models/entities/types/_index';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotDangerComponent } from '../../../components/colors/dot-danger/dot-danger.component';
import { DotSuccessComponent } from '../../../components/colors/dot-success/dot-success.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { EmployeeDepartmentsComponent } from './employee-departments/employee-departments.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeSelectedService } from './employee-selected.service';
import { EmployeeTasksComponent } from './employee-tasks/employee-tasks.component';
import { EmployeeTimeControlComponent } from './employee-time-control/employee-time-control.component';

@Component({
  selector: 'aw-employee-view',
  templateUrl: './employee-view.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    DotSuccessComponent,
    DotDangerComponent,
    EmployeeDetailsComponent,
    CardComponent,
    TabsModule,
    EmployeeDepartmentsComponent,
    EmployeeTasksComponent,
    EmployeeTimeControlComponent
  ],
  providers: [BsModalService]
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
