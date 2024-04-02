import { Injectable, computed, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { WeekDays } from '../../core/types/week-days';
import { ApiUrls } from '../../core/urls/api-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { WorkingDaysWeek } from '../../models/entities/working-days-week.model';
import { ResultResponse } from '../../models/result-response.model';
import { WorkingDaysWeekApiService } from '../api/working-days-week-api.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class WorkingDaysWeekStateService implements StateService<WorkingDaysWeek | null> {
  private readonly workingDaysWeekApiService = inject(WorkingDaysWeekApiService);
  private readonly toastrService = inject(ToastrService);

  private readonly workingDaysWeek$ = signal<WorkingDaysWeek | null>(null);
  private readonly loadingWorkingDaysWeek$ = signal(false);

  readonly workingDaysWeek = computed(() => this.workingDaysWeek$());
  readonly loadingWorkingDaysWeek = computed(() => this.loadingWorkingDaysWeek$());

  refresh(): void {
    this.loadWorkingDaysWeek();
  }

  get(): WorkingDaysWeek | null {
    return this.workingDaysWeek$();
  }

  clean(): void {
    this.workingDaysWeek$.set(null);
  }

  updateWeekDay(weekDay: WeekDays): void {
    const workingDaysWeek = this.get() as WorkingDaysWeek;

    switch (weekDay) {
      case WeekDays.monday:
        workingDaysWeek.monday = !workingDaysWeek.monday;
        break;
      case WeekDays.tuesday:
        workingDaysWeek.tuesday = !workingDaysWeek.tuesday;
        break;
      case WeekDays.wednesday:
        workingDaysWeek.wednesday = !workingDaysWeek.wednesday;
        break;
      case WeekDays.thursday:
        workingDaysWeek.thursday = !workingDaysWeek.thursday;
        break;
      case WeekDays.friday:
        workingDaysWeek.friday = !workingDaysWeek.friday;
        break;
      case WeekDays.saturday:
        workingDaysWeek.saturday = !workingDaysWeek.saturday;
        break;
      case WeekDays.sunday:
        workingDaysWeek.sunday = !workingDaysWeek.sunday;
        break;
    }

    this.updateWorkingDaysWeek(workingDaysWeek);
  }

  private updateWorkingDaysWeek(workingDaysWeek: WorkingDaysWeek): void {
    this.loadingWorkingDaysWeek$.set(true);
    const url = CommonUtils.urlReplaceParams(ApiUrls.workingDaysWeek.updateWorkingDaysWeek, {
      id: this.get()?.id as string
    });

    this.workingDaysWeekApiService
      .put<WorkingDaysWeek, ResultResponse>(workingDaysWeek, url)
      .pipe(finalize(() => this.loadingWorkingDaysWeek$.set(false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.toastrService.error('Error al actualizar día laborable.');
          }

          this.workingDaysWeek$.set(workingDaysWeek);
        },
        error: () => {
          this.toastrService.error('Error al actualizar día laborable.');
        }
      });
  }

  private loadWorkingDaysWeek(): void {
    this.loadingWorkingDaysWeek$.set(true);

    this.workingDaysWeekApiService
      .get<WorkingDaysWeek>(ApiUrls.workingDaysWeek.getWorkingDaysWeek)
      .pipe(finalize(() => this.loadingWorkingDaysWeek$.set(false)))
      .subscribe({
        next: (result: WorkingDaysWeek) => {
          this.workingDaysWeek$.set(result);
        }
      });
  }
}
