import { Component, Input } from '@angular/core';
import { ProgressStackedCollection } from '../progress-stacked/progress-stacked-collection';
import { SpinnerComponent } from '../../spinner/spinner.component';
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
}
