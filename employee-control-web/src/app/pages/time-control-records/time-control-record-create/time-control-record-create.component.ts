import { Component, OnDestroy, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrls } from '../../../core/urls/site-urls';
import { TimeControlRecordCreateFormComponent } from './time-control-record-create-form/time-control-record-create-form.component';
import { TimeControlRecordCreateService } from './time-control-record-create.service';
import { TimeControlSelectEmployeeComponent } from './time-control-select-employee/time-control-select-employee.component';

@Component({
  selector: 'aw-time-control-record-create',
  templateUrl: './time-control-record-create.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
    CardComponent,
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
      .add('Registro de tiempos', SiteUrls.timeControlRecords.list)
      .add('Añadir tiempo', SiteUrls.timeControlRecords.create, '', false);
  }
}