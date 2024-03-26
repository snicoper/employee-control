import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipDirective } from '../../../directives/tooltip.directive';
import { ProgressStackedCollection } from './progress-stacked-collection';
import { ProgressStackedItem } from './progress-stacked-item.model';

@Component({
  selector: 'aw-progress-stacked',
  templateUrl: './progress-stacked.component.html',
  styleUrls: ['./progress-stacked.component.scss'],
  standalone: true,
  imports: [NgStyle, TooltipDirective, NgClass]
})
export class ProgressStackedComponent {
  @Input({ required: true }) progressStackedCollection: ProgressStackedCollection;

  @Output() clickProgress = new EventEmitter<ProgressStackedItem>();

  constructor() {
    this.progressStackedCollection = new ProgressStackedCollection();
  }

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    this.clickProgress.emit(progressStackedItem);
  }
}
