import { ProgressStackedItem } from './progress-stacked-item.model';

export class ProgressStackedCollection {
  progressStackedItems: ProgressStackedItem[] = [];
  title = '';

  addItem(progressStackedItem: ProgressStackedItem): this {
    this.progressStackedItems.push({
      id: progressStackedItem.id,
      valueNow: progressStackedItem.valueNow,
      valueMin: progressStackedItem.valueMin,
      valueMax: progressStackedItem.valueMax,
      percent: progressStackedItem.percent,
      content: progressStackedItem.content,
      tooltip: progressStackedItem.tooltip,
      background: progressStackedItem.background,
      selectable: progressStackedItem.selectable
    });

    return this;
  }
}
