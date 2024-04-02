import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { ProgressStackedCollection } from '../../../../components/progress/progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../../../../components/progress/progress-stacked/progress-stacked-item.model';
import { TimeControlProgressComponent } from '../../../../components/progress/time-control-progress/time-control-progress.component';
import { MonthSelectorComponent } from '../../../../components/selectors/month-selector/month-selector.component';
import { TimeControlProgressStacked } from '../../../../core/features/times-control/time-control-group';
import { TimeControlGroupResponse } from '../../../../core/features/times-control/times-control-response.model';
import { ApiUrls } from '../../../../core/urls/api-urls';
import { SiteUrls } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { DateUtils } from '../../../../core/utils/date-utils';
import { DatetimeUtils } from '../../../../core/utils/datetime-utils';
import { TimeControlApiService } from '../../../../services/api/time-control-api.service';
import { EmployeeSelectedService } from '../employee-selected.service';

@Component({
  selector: 'aw-employee-time-control-progress',
  templateUrl: './employee-time-control-progress.component.html',
  standalone: true,
  imports: [MonthSelectorComponent, TimeControlProgressComponent]
})
export class EmployeeTimeControlProgressComponent {
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly router = inject(Router);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  progressStackedCollection: ProgressStackedCollection[] = [];
  dateSelected = new Date();
  loadingTimeControls = false;
  timeTotalInMonth = '';

  constructor() {
    this.loadTimesControlRange();
  }

  handleDateSelected(date: Date): void {
    this.dateSelected = date;
    this.loadTimesControlRange();
  }

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    const url = CommonUtils.urlReplaceParams(SiteUrls.timeControlRecords.details, { id: progressStackedItem.id });
    this.router.navigateByUrl(url);
  }

  /** Obtener lista de tiempos en el mes/año seleccionado. */
  private loadTimesControlRange(): void {
    this.loadingTimeControls = true;
    this.progressStackedCollection = [];

    const dateSelected = DateTime.fromJSDate(this.dateSelected);
    const startDate = dateSelected.startOf('month');
    const endDate = dateSelected.endOf('month');

    const url = CommonUtils.urlReplaceParams(ApiUrls.timeControl.getTimeControlRangeByEmployeeId, {
      employeeId: this.employeeSelected()?.id.toString() as string,
      from: DatetimeUtils.toISOString(startDate),
      to: DatetimeUtils.toISOString(endDate)
    });

    this.timeControlApiService
      .get<TimeControlGroupResponse[]>(url)
      .pipe(finalize(() => (this.loadingTimeControls = false)))
      .subscribe({
        next: (result: TimeControlGroupResponse[]) => {
          const timeControlProgressStacked = new TimeControlProgressStacked(result, this.dateSelected);
          this.progressStackedCollection = timeControlProgressStacked.compose();

          const timeTotal = result
            .filter((group) => group.totalMinutes > 0)
            .reduce((current, next) => current + next.totalMinutes, 0);

          this.timeTotalInMonth = DateUtils.formatMinutesToTime(timeTotal);
        }
      });
  }
}
