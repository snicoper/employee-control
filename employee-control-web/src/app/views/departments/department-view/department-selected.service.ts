import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrls } from '../../../core/urls/api-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { Department } from '../../../models/entities/department.model';
import { DepartmentApiService } from '../../../services/api/department-api.service';

@Injectable({ providedIn: 'root' })
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
