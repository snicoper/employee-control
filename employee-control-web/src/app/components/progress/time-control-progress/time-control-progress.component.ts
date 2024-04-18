import { Component, input, output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressStackedCollection } from '../progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../progress-stacked/progress-stacked-item.model';
import { ProgressStackedComponent } from '../progress-stacked/progress-stacked.component';

@Component({
  selector: 'aw-time-control-progress',
  templateUrl: './time-control-progress.component.html',
  standalone: true,
  imports: [ProgressStackedComponent, MatProgressSpinnerModule]
})
export class TimeControlProgressComponent {
  progressStackedCollection = input.required<Array<ProgressStackedCollection>>();
  loading = input.required<boolean>();

  clickProgress = output<ProgressStackedItem>();

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    this.clickProgress.emit(progressStackedItem);
  }
}
