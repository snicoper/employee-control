import { Component, OnDestroy, computed, inject } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { TimeControlRecordCreateService } from './time-control-record-create.service';

@Component({
  selector: 'aw-time-control-record-create',
  templateUrl: './time-control-record-create.component.html'
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
