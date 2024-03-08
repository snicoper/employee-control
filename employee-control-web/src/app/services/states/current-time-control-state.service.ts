import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls } from '@aw/core/urls/_index';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { CurrentTimeControlResponse } from '@aw/models/_index';
import { finalize } from 'rxjs';
import { TimeControlApiService } from '../api/time-control-api.service';
import { JwtService } from '../jwt.service';

/** Estado del usuario activo. */
@Injectable({ providedIn: 'root' })
export class CurrentTimeControlStateService {
  private readonly jwtService = inject(JwtService);
  private readonly timeControlApiService = inject(TimeControlApiService);

  private readonly currentTimeControl$ = signal<CurrentTimeControlResponse | null>(null);
  private readonly loadingCurrentTimeControl$ = signal(false);

  readonly currentTimeControl = computed(() => this.currentTimeControl$());
  readonly loadingCurrentTimeControl = computed(() => this.loadingCurrentTimeControl$());

  refresh(): void {
    this.loadCurrentTimeControl();
  }

  getCurrentStateValue(): CurrentTimeControlResponse | null {
    return this.currentTimeControl$();
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
