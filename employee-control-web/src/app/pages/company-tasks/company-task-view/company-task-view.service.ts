import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { CompanyTask } from '../../../models/entities/company-task.model';
import { CompanyTaskApiService } from '../../../services/api/company-task-api.service';

/**
 * Tarea seleccionada desde la lista (company-task-list).
 * Control de la tab seleccionada.
 */
@Injectable()
export class CompanyTaskViewService {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);

  private readonly companyTaskSelected$ = signal<CompanyTask | null>(null);
  private readonly companyTaskVLoading$ = signal(false);
  private readonly tabSelected$ = signal<'user-list' | 'add-users'>('user-list');

  readonly companyTaskSelected = computed(() => this.companyTaskSelected$());
  readonly companyTaskVLoading = computed(() => this.companyTaskVLoading$());
  readonly tabSelected = computed(() => this.tabSelected$());

  toggleTabSelected(): void {
    if (this.tabSelected$() === 'user-list') {
      this.tabSelected$.set('add-users');
    } else {
      this.tabSelected$.set('user-list');
    }
  }

  loadCompanyTaskById(companyTaskId: string): void {
    this.companyTaskVLoading$.set(true);
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.getCompanyTasksById, { id: companyTaskId });

    this.companyTaskApiService
      .get<CompanyTask>(url)
      .pipe(finalize(() => this.companyTaskVLoading$.set(false)))
      .subscribe({
        next: (result: CompanyTask) => {
          this.companyTaskSelected$.set(result);
        }
      });
  }
}
