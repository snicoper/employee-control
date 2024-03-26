import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ProgressStackedCollection } from '../progress-stacked/progress-stacked-collection';
import { ProgressStackedItem } from '../progress-stacked/progress-stacked-item.model';
import { ProgressStackedComponent } from '../progress-stacked/progress-stacked.component';

@Component({
  selector: 'aw-time-control-progress',
  templateUrl: './time-control-progress.component.html',
  standalone: true,
  imports: [ProgressStackedComponent, SpinnerComponent]
})
export class TimeControlProgressComponent {
  @Input({ required: true }) progressStackedCollection: ProgressStackedCollection[] = [];
  @Input({ required: true }) loading = false;

  @Output() clickProgress = new EventEmitter<ProgressStackedItem>();

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    this.clickProgress.emit(progressStackedItem);
  }
}
