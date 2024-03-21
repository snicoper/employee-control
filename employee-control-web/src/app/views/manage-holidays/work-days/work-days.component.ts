import { Component } from '@angular/core';
import { WorkDays } from './../../../models/entities/work-days.model';

@Component({
  selector: 'aw-work-days',
  templateUrl: './work-days.component.html'
})
export class WorkDaysComponent {
  workdays!: WorkDays;
  year = new Date().getFullYear();

  constructor() {
    this.loadWorkDays();
  }

  private loadWorkDays(): void {}
}
