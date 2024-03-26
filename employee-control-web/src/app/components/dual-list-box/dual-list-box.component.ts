import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HtmlItemSelector } from './../../core/models/html-item-selector.model';
import { DualListBox } from './dual-list-box.model';

@Component({
  selector: 'aw-dual-list-box',
  templateUrl: './dual-list-box.component.html',
  styleUrls: ['./dual-list-box.component.scss'],
  standalone: true,
  imports: [FormsModule, NgClass, SpinnerComponent]
})
export class DualListBoxComponent implements OnInit {
  @Input({ required: true }) htmlItemSelector: HtmlItemSelector[] = [];
  @Input() loading = false;
  @Input() size = 10;

  @Output() saveChanges = new EventEmitter<DualListBox>();

  /** Box left. */
  boxLeftId = Math.random().toString();
  htmlItemSelectorsLeft: HtmlItemSelector[] = [];
  itemsLeftSelected: string[] | number[] = [];
  termLeftValue = '';

  /** Box right. */
  boxRightId = Math.random().toString();
  htmlItemSelectorsRight: HtmlItemSelector[] = [];
  itemsRightSelected: string[] | number[] = [];
  termRightValue = '';

  ngOnInit(): void {
    // Separar grupos y eliminar referencias de htmlItemSelectors.
    this.htmlItemSelector.forEach((item) => {
      if (!item.selected) {
        this.htmlItemSelectorsLeft.push(Object.assign({} as HtmlItemSelector, item));
      } else {
        this.htmlItemSelectorsRight.push(Object.assign({} as HtmlItemSelector, item));
      }
    });

    this.sortItems(this.htmlItemSelectorsLeft);
    this.sortItems(this.htmlItemSelectorsRight);
  }

  /** Filtros parte izquierdo. */
  handleFilterLeftBox(): void {
    this.htmlItemSelectorsLeft = this.htmlItemSelector.filter(
      (item) => !item.selected && item.value.toLocaleLowerCase().includes(this.termLeftValue.toLocaleLowerCase())
    );
  }

  /** Filtros parte derecho. */
  handleFilterRightBox(): void {
    this.htmlItemSelectorsRight = this.htmlItemSelector.filter(
      (item) => item.selected && item.value.toLocaleLowerCase().includes(this.termRightValue.toLocaleLowerCase())
    );
  }

  /** Mover items seleccionados en la izquierda a la derecha. */
  handleLeftBtnClick(): void {
    this.itemsLeftSelected.forEach((key) => {
      const index = this.htmlItemSelectorsLeft.findIndex((itemSelector) => itemSelector.id === key);
      const item = this.htmlItemSelectorsLeft[index];

      if (index >= 0) {
        this.htmlItemSelectorsLeft.splice(index, 1);
      }

      item.selected = true;
      this.htmlItemSelectorsRight.push(item);
      this.sortItems(this.htmlItemSelectorsRight);
    });

    this.itemsLeftSelected = [];
  }

  /** Mover items seleccionados en la derecha a la izquierda. */
  handleRightBtnClick(): void {
    this.itemsRightSelected.forEach((key) => {
      const index = this.htmlItemSelectorsRight.findIndex((itemSelector) => itemSelector.id === key);
      const item = this.htmlItemSelectorsRight[index];

      if (index >= 0) {
        this.htmlItemSelectorsRight.splice(index, 1);
      }

      item.selected = false;
      this.htmlItemSelectorsLeft.push(item);
      this.sortItems(this.htmlItemSelectorsLeft);
    });

    this.itemsRightSelected = [];
  }

  /** Filtrar los items movidos de un lado a otro y viceversa. */
  handleSaveChanges(): void {
    const itemsToAdd: HtmlItemSelector[] = [];
    const itemsToRemove: HtmlItemSelector[] = [];

    this.htmlItemSelectorsRight.forEach((itemRight) => {
      const item = this.htmlItemSelector.find(
        (itemList) => itemList.id === itemRight.id && itemList.selected !== itemRight.selected
      );

      if (item) {
        itemsToAdd.push(item);
      }
    });

    this.htmlItemSelectorsLeft.forEach((itemLeft) => {
      const item = this.htmlItemSelector.find(
        (itemList) => itemList.id === itemLeft.id && itemList.selected !== itemLeft.selected
      );

      if (item) {
        itemsToRemove.push(item);
      }
    });

    this.saveChanges.emit({ itemsToAdd: itemsToAdd, itemsToRemove: itemsToRemove });
  }

  /** Ordenar los items por el name. */
  private sortItems(items: HtmlItemSelector[]): void {
    items.sort((left: HtmlItemSelector, right: HtmlItemSelector) => (left.value < right.value ? -1 : 1));
  }
}
