import { Component } from '@angular/core';
import { YearCalendarComponent } from '../../../components/year-calendar/year-calendar.component';
import { WorkDays } from './../../../models/entities/work-days.model';

@Component({
  selector: 'aw-work-days',
  templateUrl: './work-days.component.html',
  standalone: true,
  imports: [YearCalendarComponent]
})
export class WorkDaysComponent {
  workdays!: WorkDays;
  year = new Date().getFullYear();

  constructor() {
    this.loadWorkDays();
  }

  private loadWorkDays(): void {}
}
