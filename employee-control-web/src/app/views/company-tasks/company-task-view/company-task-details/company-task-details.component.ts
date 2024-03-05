import { Component, Input, OnDestroy, computed, inject } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CompanyTaskSelectedService } from '../company-task-selected.service';

@Component({
  selector: 'aw-company-task-details',
  templateUrl: './company-task-details.component.html'
})
export class CompanyTaskDetailsComponent implements OnDestroy {
  @Input({ required: true }) companyTaskId = '';

  private readonly toastrService = inject(ToastrService);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);
  private readonly companyTaskApiService = inject(CompanyTaskApiService);

  readonly companyTaskSelected = computed(() => this.companyTaskSelectedService.companyTaskSelected());
  readonly companyTaskLoading = computed(() => this.companyTaskSelectedService.companyTaskLoading());

  readonly dateShort = DateTime.DATE_SHORT;

  loadingStateTask = false;
  siteUrls = SiteUrls;

  get urlToEdit(): string {
    return urlReplaceParams(SiteUrls.companyTasks.edit, { id: this.companyTaskId });
  }

  ngOnDestroy(): void {
    this.companyTaskSelectedService.clean();
  }

  handleActivateTask(): void {
    this.loadingStateTask = true;
    const url = urlReplaceParams(ApiUrls.companyTasks.activateCompanyTask, { id: this.companyTaskId });
    const data = { companyTaskId: this.companyTaskId };

    this.companyTaskApiService
      .put<typeof data, undefined>(data, url)
      .pipe(finalize(() => (this.loadingStateTask = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tareas activada con éxito.');
          this.companyTaskSelectedService.loadData(this.companyTaskId);
        }
      });
  }

  handleDeactivateTask(): void {
    this.loadingStateTask = true;
    const url = urlReplaceParams(ApiUrls.companyTasks.deactivateCompanyTask, { id: this.companyTaskId });
    const data = { companyTaskId: this.companyTaskId };

    this.companyTaskApiService
      .put<typeof data, undefined>(data, url)
      .pipe(finalize(() => (this.loadingStateTask = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tareas desactivada con éxito.');
          this.companyTaskSelectedService.loadData(this.companyTaskId);
        }
      });
  }
}
