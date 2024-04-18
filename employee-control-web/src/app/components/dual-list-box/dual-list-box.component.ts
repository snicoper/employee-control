import { NgClass } from '@angular/common';
import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DualListBoxItem } from './dual-list-box-item.model';
import { DualListBox } from './dual-list-box.model';

@Component({
  selector: 'aw-dual-list-box',
  templateUrl: './dual-list-box.component.html',
  styleUrls: ['./dual-list-box.component.scss'],
  standalone: true,
  imports: [FormsModule, NgClass, MatProgressSpinner, MatButton, MatIcon, MatFormFieldModule, MatInputModule]
})
export class DualListBoxComponent implements OnInit {
  dualListBoxItems = input.required<DualListBoxItem[]>();
  labelLeftListBox = input.required<string>();
  labelRightListBox = input.required<string>();
  loading = input.required();
  textButtonAction = input('Guardar cambios');
  size = input(10);

  saveChanges = output<DualListBox>();

  /** Box left. */
  boxLeftId = Math.random().toString();
  dualListBoxItemsLeft: DualListBoxItem[] = [];
  itemsLeftSelected: Array<string> | Array<number> = [];
  termLeftValue = '';

  /** Box right. */
  boxRightId = Math.random().toString();
  dualListBoxItemsRight: DualListBoxItem[] = [];
  itemsRightSelected: Array<string> | Array<number> = [];
  termRightValue = '';

  ngOnInit(): void {
    // Separar grupos y eliminar referencias de DualListBoxItem.
    this.dualListBoxItems().forEach((item) => {
      if (!item.selected) {
        this.dualListBoxItemsLeft.push(Object.assign({} as DualListBoxItem, item));
      } else {
        this.dualListBoxItemsRight.push(Object.assign({} as DualListBoxItem, item));
      }
    });

    this.sortItems(this.dualListBoxItemsLeft);
    this.sortItems(this.dualListBoxItemsRight);
  }

  /** Filtros parte izquierdo. */
  handleFilterLeftBox(): void {
    this.dualListBoxItemsLeft = this.dualListBoxItems().filter(
      (item) => !item.selected && item.value.toLocaleLowerCase().includes(this.termLeftValue.toLocaleLowerCase())
    );
  }

  /** Filtros parte derecho. */
  handleFilterRightBox(): void {
    this.dualListBoxItemsRight = this.dualListBoxItems().filter(
      (item) => item.selected && item.value.toLocaleLowerCase().includes(this.termRightValue.toLocaleLowerCase())
    );
  }

  /** Mover items seleccionados en la izquierda a la derecha. */
  handleLeftBtnClick(): void {
    this.itemsLeftSelected.forEach((key) => {
      const index = this.dualListBoxItemsLeft.findIndex((itemSelector) => itemSelector.id === key);
      const item = this.dualListBoxItemsLeft[index];

      if (index >= 0) {
        this.dualListBoxItemsLeft.splice(index, 1);
      }

      item.selected = true;
      this.dualListBoxItemsRight.push(item);
      this.sortItems(this.dualListBoxItemsRight);
    });

    this.itemsLeftSelected = [];
  }

  /** Mover items seleccionados en la derecha a la izquierda. */
  handleRightBtnClick(): void {
    this.itemsRightSelected.forEach((key) => {
      const index = this.dualListBoxItemsRight.findIndex((itemSelector) => itemSelector.id === key);
      const item = this.dualListBoxItemsRight[index];

      if (index >= 0) {
        this.dualListBoxItemsRight.splice(index, 1);
      }

      item.selected = false;
      this.dualListBoxItemsLeft.push(item);
      this.sortItems(this.dualListBoxItemsLeft);
    });

    this.itemsRightSelected = [];
  }

  /** Filtrar los items movidos de un lado a otro y viceversa. */
  handleSaveChanges(): void {
    const itemsToAdd: Array<DualListBoxItem> = [];
    const itemsToRemove: Array<DualListBoxItem> = [];

    this.dualListBoxItemsRight.forEach((itemRight) => {
      const item = this.dualListBoxItems().find(
        (itemList) => itemList.id === itemRight.id && itemList.selected !== itemRight.selected
      );

      if (item) {
        itemsToAdd.push(item);
      }
    });

    this.dualListBoxItemsLeft.forEach((itemLeft) => {
      const item = this.dualListBoxItems().find(
        (itemList) => itemList.id === itemLeft.id && itemList.selected !== itemLeft.selected
      );

      if (item) {
        itemsToRemove.push(item);
      }
    });

    this.saveChanges.emit({ itemsToAdd: itemsToAdd, itemsToRemove: itemsToRemove });
  }

  /** Ordenar los items por el name. */
  private sortItems(items: DualListBoxItem[]): void {
    items.sort((left: DualListBoxItem, right: DualListBoxItem) => (left.value < right.value ? -1 : 1));
  }
}
