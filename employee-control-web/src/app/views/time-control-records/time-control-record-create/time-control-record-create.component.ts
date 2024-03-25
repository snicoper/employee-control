import { Component, OnDestroy, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { TimeControlRecordCreateFormComponent } from './time-control-record-create-form/time-control-record-create-form.component';
import { TimeControlRecordCreateService } from './time-control-record-create.service';
import { TimeControlSelectEmployeeComponent } from './time-control-select-employee/time-control-select-employee.component';

@Component({
  selector: 'aw-time-control-record-create',
  templateUrl: './time-control-record-create.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
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
      .add('Registro de tiempos', SiteUrls.timeControlRecords.home)
      .add('Añadir tiempo', SiteUrls.timeControlRecords.create, '', false);
  }
}
