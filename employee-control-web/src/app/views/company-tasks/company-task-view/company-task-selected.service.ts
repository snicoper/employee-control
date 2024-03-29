import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrls } from '../../../core/urls/_index';
import { urlReplaceParams } from '../../../core/utils/_index';
import { CompanyTask } from '../../../models/entities/_index';
import { CompanyTaskApiService } from '../../../services/api/_index';

/** Tarea seleccionada desde la lista (company-task-list). */
@Injectable({ providedIn: 'root' })
export class CompanyTaskSelectedService {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);

  private readonly companyTaskSelected$ = signal<CompanyTask | null>(null);
  private readonly companyTaskLoading$ = signal(false);

  readonly companyTaskSelected = computed(() => this.companyTaskSelected$());
  readonly companyTaskLoading = computed(() => this.companyTaskLoading$());

  clean(): void {
    this.companyTaskSelected$.set(null);
  }

  loadData(companyTaskId: string): void {
    this.companyTaskLoading$.set(true);
    const url = urlReplaceParams(ApiUrls.companyTasks.getCompanyTasksById, { id: companyTaskId });

    this.companyTaskApiService
      .get<CompanyTask>(url)
      .pipe(finalize(() => this.companyTaskLoading$.set(false)))
      .subscribe({
        next: (result: CompanyTask) => {
          this.companyTaskSelected$.set(result);
        }
      });
  }
}
