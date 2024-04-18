import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { Department } from '../../../models/entities/department.model';
import { DepartmentApiService } from '../../../services/api/department-api.service';

@Injectable()
export class DepartmentSelectedService {
  private readonly departmentApiService = inject(DepartmentApiService);

  private readonly departmentSelected$ = signal<Department | null>(null);
  private readonly departmentSelectedLoading$ = signal(false);
  private readonly tabSelected$ = signal<'user-list' | 'add-users'>('user-list');

  readonly departmentSelected = computed(() => this.departmentSelected$());
  readonly departmentSelectedLoading = computed(() => this.departmentSelectedLoading$());
  readonly tabSelected = computed(() => this.tabSelected$());

  toggleTabSelected(): void {
    if (this.tabSelected$() === 'user-list') {
      this.tabSelected$.set('add-users');
    } else {
      this.tabSelected$.set('user-list');
    }
  }

  loadDepartmentById(id: string): void {
    this.departmentSelectedLoading$.set(true);
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.getDepartmentById, { id: id });

    this.departmentApiService
      .get<Department>(url)
      .pipe(finalize(() => this.departmentSelectedLoading$.set(false)))
      .subscribe({
        next: (result: Department) => {
          this.departmentSelected$.set(result);
        }
      });
  }
}
