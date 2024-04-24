import { Component, OnInit, computed, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badge/badge.component';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DateFormatPipe } from '../../../../pipes/date-format.pipe';
import { CompanyTaskApiService } from '../../../../services/api/company-task-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { CompanyTaskViewService } from '../company-task-view.service';

@Component({
  selector: 'aw-company-task-details',
  templateUrl: './company-task-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatCardModule,
    MatButton,
    MatIcon,
    MatDivider,
    MatProgressSpinner,
    BadgeComponent,
    BtnLoadingComponent,
    BtnBackComponent,
    BoolToIconPipe,
    DateFormatPipe
  ]
})
export class CompanyTaskDetailsComponent implements OnInit {
  private readonly snackBarService = inject(SnackBarService);
  private readonly companyTaskViewService = inject(CompanyTaskViewService);
  private readonly companyTaskApiService = inject(CompanyTaskApiService);

  companyTaskId = input.required<string>();

  readonly companyTaskSelected = computed(() => this.companyTaskViewService.companyTaskSelected());
  readonly companyTaskVLoading = computed(() => this.companyTaskViewService.companyTaskVLoading());

  readonly siteUrl = SiteUrl;

  urlToEdit!: string;
  loadingStateTask = false;

  ngOnInit(): void {
    this.urlToEdit = CommonUtils.urlReplaceParams(SiteUrl.companyTasks.update, { id: this.companyTaskId() });
  }

  handleActivateTask(): void {
    this.loadingStateTask = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.activateCompanyTask, { id: this.companyTaskId() });
    const data = { companyTaskId: this.companyTaskId() };

    this.companyTaskApiService
      .put<typeof data, undefined>(data, url)
      .pipe(finalize(() => (this.loadingStateTask = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tareas activada con éxito.');
          this.companyTaskViewService.loadCompanyTaskById(this.companyTaskId());
        }
      });
  }

  handleDeactivateTask(): void {
    this.loadingStateTask = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.deactivateCompanyTask, { id: this.companyTaskId() });
    const data = { companyTaskId: this.companyTaskId() };

    this.companyTaskApiService
      .put<typeof data, undefined>(data, url)
      .pipe(finalize(() => (this.loadingStateTask = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tareas desactivada con éxito.');
          this.companyTaskViewService.loadCompanyTaskById(this.companyTaskId());
        }
      });
  }
}
