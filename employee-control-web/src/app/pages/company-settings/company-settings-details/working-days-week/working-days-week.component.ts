import { NgClass } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeekDay } from '../../../../core/types/week-day';
import { WorkingDaysWeek } from '../../../../models/entities/working-days-week.model';
import { WorkingDaysWeekStateService } from '../../../../services/states/working-days-week-state.service';

@Component({
  selector: 'aw-working-days-week',
  standalone: true,
  imports: [NgClass, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './working-days-week.component.html',
  styleUrl: './working-days-week.component.scss'
})
export class WorkingDaysWeekComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);

  workingDaysWeekEmitter = output<WorkingDaysWeek>();

  loadingWorkingDaysWeek = computed(() => this.workingDaysWeekStateService.loadingWorkingDaysWeek());
  workingDaysWeek = computed(() => this.workingDaysWeekStateService.workingDaysWeek());

  weekDay = WeekDay;

  handleClickDay(weekDay: WeekDay): void {
    if (!this.workingDaysWeek) {
      return;
    }

    this.workingDaysWeekStateService.updateWeekDay(weekDay);
  }
}
