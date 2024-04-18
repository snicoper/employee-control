import { Injectable, computed, inject, signal } from '@angular/core';
import { HubName } from '../../core/types/hub-name';
import { ApiUrl } from '../../core/urls/api-urls';
import { TimeControlIncidencesCountStateResponse } from '../../models/states/time-control-incidences-count-state-response.model';
import { TimeControlApiService } from '../api/time-control-api.service';
import { SignalRService } from '../signalr.service';
import { StateService } from './state.service';

/**
 * Estado de notificaciones de incidencias de TimeControl.
 * Utiliza SignalR para obtener notificaciones en tiempo real.
 */
@Injectable({ providedIn: 'root' })
export class TimeControlIncidencesCountStateService implements StateService<number> {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly signalRService = inject(SignalRService);

  private readonly incidences$ = signal(0);

  readonly incidences = computed(() => this.incidences$());

  constructor() {
    this.addListener();
  }

  refresh(): void {
    this.loadIncidencesCount();
  }

  get(): number {
    return this.incidences$();
  }

  clean(): void {
    this.incidences$.set(0);
  }

  private loadIncidencesCount(): void {
    this.timeControlApiService
      .get<TimeControlIncidencesCountStateResponse>(ApiUrl.timeControl.getTimeControlIncidencesCount)
      .subscribe({
        next: (result: TimeControlIncidencesCountStateResponse) => {
          this.incidences$.set(result.incidences);
        }
      });
  }

  private addListener(): void {
    this.signalRService.hubConnection.on(HubName.TimeControlIncidences, () => {
      this.refresh();
    });
  }
}
