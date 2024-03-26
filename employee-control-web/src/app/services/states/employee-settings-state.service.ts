import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { LocalizationService } from '../../core/features/localizations/_index';
import { ApiUrls } from '../../core/urls/_index';
import { EmployeeSettings } from '../../models/entities/_index';
import { EmployeesApiService } from '../api/employees-api.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSettingsStateService implements StateService<EmployeeSettings | null> {
  private readonly localizationService = inject(LocalizationService);
  private readonly employeesApiService = inject(EmployeesApiService);

  private readonly employeeSettings$ = signal<EmployeeSettings | null>(null);
  private readonly loadingEmployeeSettings$ = signal(false);

  readonly employeeSettings = computed(() => this.employeeSettings$());
  readonly loadingEmployeeSettings = computed(() => this.loadingEmployeeSettings$());

  refresh(): void {
    this.loadEmployeeSettings();
  }

  clean(): void {
    this.employeeSettings$.set(null);
  }

  getValue(): EmployeeSettings | null {
    return this.employeeSettings$();
  }

  private loadEmployeeSettings(): void {
    this.loadingEmployeeSettings$.set(true);

    this.employeesApiService
      .get<EmployeeSettings>(ApiUrls.employees.getCurrentEmployeeSettings)
      .pipe(finalize(() => this.loadingEmployeeSettings$.set(false)))
      .subscribe({
        next: (result: EmployeeSettings) => {
          this.employeeSettings$.set(result);
          this.localizationService.setTimezone(result.timezone);
        }
      });
  }
}
