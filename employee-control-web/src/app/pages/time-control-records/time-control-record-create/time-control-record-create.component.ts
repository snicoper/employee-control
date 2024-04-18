import { Component, OnDestroy, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { TimeControlRecordCreateFormComponent } from './time-control-record-create-form/time-control-record-create-form.component';
import { TimeControlRecordCreateService } from './time-control-record-create.service';
import { TimeControlSelectEmployeeComponent } from './time-control-select-employee/time-control-select-employee.component';

@Component({
  selector: 'aw-time-control-record-create',
  templateUrl: './time-control-record-create.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    PageBaseComponent,
    PageHeaderComponent,
    TimeControlSelectEmployeeComponent,
    TimeControlRecordCreateFormComponent
  ]
})
export class TimeControlRecordCreateComponent implements OnDestroy {
  private readonly timeControlRecordCreateService = inject(TimeControlRecordCreateService);

  readonly breadcrumb = new BreadcrumbCollection();

  employeeSelected = computed(() => this.timeControlRecordCreateService.employeeSelected());

  constructor() {
    this.setBreadcrumb();
  }

  ngOnDestroy(): void {
    this.timeControlRecordCreateService.clean();
  }

  handleSelectEmployee(): void {
    this.timeControlRecordCreateService.clean();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Registro de tiempos', SiteUrl.timeControlRecords.list)
      .add('Añadir tiempo', SiteUrl.timeControlRecords.create, '', false);
  }
}
