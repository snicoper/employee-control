import { Component, Input } from '@angular/core';
import { ProgressStackedCollection } from './progress-stacked-collection';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { NgStyle, NgClass } from '@angular/common';

@Component({
    selector: 'aw-progress-stacked',
    templateUrl: './progress-stacked.component.html',
    styleUrls: ['./progress-stacked.component.scss'],
    standalone: true,
    imports: [NgStyle, TooltipDirective, NgClass]
})
export class ProgressStackedComponent {
  @Input({ required: true }) progressStackedCollection: ProgressStackedCollection;

  constructor() {
    this.progressStackedCollection = new ProgressStackedCollection();
  }
}
