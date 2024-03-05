import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { Department } from '@aw/models/entities/department.model';
import { DepartmentApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';

@Injectable()
export class DepartmentSelectedService {
  private readonly departmentApiService = inject(DepartmentApiService);

  private readonly departmentSelected$ = signal<Department | null>(null);
  private readonly loadingDepartmentSelected$ = signal(false);

  readonly departmentSelected = computed(() => this.departmentSelected$());
  readonly loadingDepartmentSelected = computed(() => this.loadingDepartmentSelected$());

  clean(): void {
    this.departmentSelected$.set(null);
  }

  loadDepartmentById(id: string): void {
    this.loadingDepartmentSelected$.set(true);
    const url = urlReplaceParams(ApiUrls.departments.getDepartmentById, { id: id });

    this.departmentApiService
      .get<Department>(url)
      .pipe(finalize(() => this.loadingDepartmentSelected$.set(false)))
      .subscribe({
        next: (result: Department) => {
          this.departmentSelected$.set(result);
        }
      });
  }
}
