import { Component, Input } from '@angular/core';
import { ProgressStackedCollection } from '../progress-stacked/progress-stacked-collection';

@Component({
  selector: 'aw-time-control-progress',
  templateUrl: './time-control-progress.component.html'
})
export class TimeControlProgressComponent {
  @Input({ required: true }) progressStackedCollection: ProgressStackedCollection[] = [];
  @Input({ required: true }) loading = false;
}
