import { DualListBoxItem } from './dual-list-box-item.model';

export interface DualListBox {
  itemsToAdd: DualListBoxItem[];
  itemsToRemove: DualListBoxItem[];
}
