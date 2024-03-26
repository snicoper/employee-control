import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { ProgressStackedCollection } from './progress-stacked-collection';

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
