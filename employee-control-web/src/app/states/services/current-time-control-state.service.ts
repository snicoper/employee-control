import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrls } from '../../core/urls/api-urls';
import { urlReplaceParams } from '../../core/utils/common-utils';
import { TimeControlApiService } from '../../services/api/time-control-api.service';
import { JwtService } from '../../services/jwt.service';
import { CurrentTimeControlResponse } from '../models/current-time-control-response.model';
import { StateService } from './state.service';

/** Estado del usuario activo. */
@Injectable({ providedIn: 'root' })
export class CurrentTimeControlStateService implements StateService<CurrentTimeControlResponse | null> {
  private readonly jwtService = inject(JwtService);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly currentTimeControl$ = signal<CurrentTimeControlResponse | null>(null);
  private readonly loadingCurrentTimeControl$ = signal(false);

  readonly currentTimeControl = computed(() => this.currentTimeControl$());
  readonly loadingCurrentTimeControl = computed(() => this.loadingCurrentTimeControl$());

  refresh(): void {
    this.loadCurrentTimeControl();
  }

  get(): CurrentTimeControlResponse | null {
    return this.currentTimeControl$();
  }

  clean(): void {
    this.loadingCurrentTimeControl$.set(false);
    this.currentTimeControl$.set(null);
  }

  private loadCurrentTimeControl(): void {
    this.loadingCurrentTimeControl$.set(true);

    const url = urlReplaceParams(ApiUrls.timeControl.getTimeStateOpenByEmployeeId, {
      employeeId: this.jwtService.getSid()
    });

    this.timeControlApiService
      .get<CurrentTimeControlResponse>(url)
      .pipe(finalize(() => this.loadingCurrentTimeControl$.set(false)))
      .subscribe({
        next: (result: CurrentTimeControlResponse) => {
          this.currentTimeControl$.set(result);
        }
      });
  }
}
