import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrls } from '../../core/urls/api-urls';
import { urlReplaceParams } from '../../core/utils/common-utils';
import { TimeControlStateResponse } from '../../models/states/time-control-state-response.model';
import { TimeControlApiService } from '../api/time-control-api.service';
import { JwtService } from '../jwt.service';
import { StateService } from './state.service';

/** Estado del usuario activo. */
@Injectable({ providedIn: 'root' })
export class UserTimeControlStateService implements StateService<TimeControlStateResponse | null> {
  private readonly jwtService = inject(JwtService);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly timeControlStateResponse$ = signal<TimeControlStateResponse | null>(null);
  private readonly loadingTimeControlState$ = signal(false);

  readonly timeControl = computed(() => this.timeControlStateResponse$());
  readonly loadingTimeControl = computed(() => this.loadingTimeControlState$());

  refresh(): void {
    this.loadCurrentTimeControl();
  }

  get(): TimeControlStateResponse | null {
    return this.timeControlStateResponse$();
  }

  clean(): void {
    this.loadingTimeControlState$.set(false);
    this.timeControlStateResponse$.set(null);
  }

  private loadCurrentTimeControl(): void {
    this.loadingTimeControlState$.set(true);

    const url = urlReplaceParams(ApiUrls.timeControl.getTimeStateOpenByEmployeeId, {
      employeeId: this.jwtService.getSid()
    });

    this.timeControlApiService
      .get<TimeControlStateResponse>(url)
      .pipe(finalize(() => this.loadingTimeControlState$.set(false)))
      .subscribe({
        next: (result: TimeControlStateResponse) => {
          this.timeControlStateResponse$.set(result);
        }
      });
  }
}
