import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { WeekDays } from '../../../core/types/_index';
import { WorkingDaysWeek } from '../../../models/entities/working-days-week.model';
import { WorkingDaysWeekStateService } from '../../../services/states/_index';

@Component({
  selector: 'aw-working-days-week',
  templateUrl: './working-days-week.component.html',
  standalone: true,
  imports: [NgClass, SpinnerComponent]
})
export class WorkingDaysWeekComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);

  @Output() workingDaysWeekEmitter = new EventEmitter<WorkingDaysWeek>();

  loadingWorkingDaysWeek = computed(() => this.workingDaysWeekStateService.loadingWorkingDaysWeek());
  workingDaysWeek = computed(() => this.workingDaysWeekStateService.workingDaysWeek());

  weekDays = WeekDays;

  handleClickDay(weekDay: WeekDays): void {
    if (!this.workingDaysWeek) {
      return;
    }

    this.workingDaysWeekStateService.updateWeekDay(weekDay);
  }
}
