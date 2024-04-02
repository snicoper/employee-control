import { Component, Input, OnDestroy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badges/badge/badge.component';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { TableLoadingComponent } from '../../../../components/tables/table-loading/table-loading.component';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DatetimePipe } from '../../../../pipes/datetime.pipe';
import { CompanyTaskApiService } from '../../../../services/api/company-task-api.service';
import { CompanyTaskSelectedService } from '../company-task-selected.service';

@Component({
  selector: 'aw-company-task-details',
  templateUrl: './company-task-details.component.html',
  standalone: true,
  imports: [
    CardComponent,
    BadgeComponent,
    BtnLoadingComponent,
    TableLoadingComponent,
    BtnBackComponent,
    RouterLink,
    BoolToIconPipe,
    DatetimePipe
  ]
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
    return CommonUtils.urlReplaceParams(SiteUrls.companyTasks.update, { id: this.companyTaskId });
  }

  ngOnDestroy(): void {
    this.companyTaskSelectedService.clean();
  }

  handleActivateTask(): void {
    this.loadingStateTask = true;
    const url = CommonUtils.urlReplaceParams(ApiUrls.companyTasks.activateCompanyTask, { id: this.companyTaskId });
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
    const url = CommonUtils.urlReplaceParams(ApiUrls.companyTasks.deactivateCompanyTask, { id: this.companyTaskId });
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
