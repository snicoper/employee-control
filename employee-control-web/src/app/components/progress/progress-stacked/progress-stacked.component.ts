import { NgClass, NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressStackedCollection } from './progress-stacked-collection';
import { ProgressStackedItem } from './progress-stacked-item.model';

@Component({
  selector: 'aw-progress-stacked',
  templateUrl: './progress-stacked.component.html',
  styleUrls: ['./progress-stacked.component.scss'],
  standalone: true,
  imports: [NgStyle, NgClass, MatTooltipModule]
})
export class ProgressStackedComponent {
  progressStackedCollection = input.required<ProgressStackedCollection>();

  clickProgress = output<ProgressStackedItem>();

  handleClickProgress(progressStackedItem: ProgressStackedItem): void {
    if (!progressStackedItem.selectable) {
      return;
    }

    this.clickProgress.emit(progressStackedItem);
  }
}
