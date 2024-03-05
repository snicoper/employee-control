import { Component, Input } from '@angular/core';
import { ProgressStackedCollection } from './progress-stacked-collection';

@Component({
  selector: 'aw-progress-stacked',
  templateUrl: './progress-stacked.component.html',
  styleUrls: ['./progress-stacked.component.scss']
})
export class ProgressStackedComponent {
  @Input({ required: true }) progressStackedCollection: ProgressStackedCollection;

  constructor() {
    this.progressStackedCollection = new ProgressStackedCollection();
  }
}
