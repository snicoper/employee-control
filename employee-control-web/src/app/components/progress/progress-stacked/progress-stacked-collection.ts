import { ProgressStackedItem } from './progress-stacked-item.model';

export class ProgressStackedCollection {
  progressStackedItems: ProgressStackedItem[] = [];
  title: string = '';

  addItem(
    id: string,
    valueNow: number,
    valueMin: number,
    valueMax: number,
    percent: number,
    content = '',
    tooltip = '',
    background = 'bg-primary'
  ): this {
    this.progressStackedItems.push({
      id: id,
      valueNow: valueNow,
      valueMin: valueMin,
      valueMax: valueMax,
      percent: percent,
      content: content,
      tooltip: tooltip,
      background: background
    });

    return this;
  }

  addTitle(title: string): void {
    this.title = title;
  }
}
