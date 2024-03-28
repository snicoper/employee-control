import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiResultItemOrderBy } from '../../../core/features/api-result/api-result-item-order-by';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';
import { TableHeaderField } from './table-header-field.interface';
import { TableHeaderConfig } from './table-header.config';

@Component({
  // eslint-disable-next-line
  selector: '[awTableHeader]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class TableHeaderComponent<T> {
  @Input({ required: true }) tableHeaderConfig = new TableHeaderConfig();
  @Input({ required: true }) apiResult = new ApiResult<T>();

  @Output() clickOrdering = new EventEmitter<void>();

  orderTypes = OrderTypes;

  handleClickOrder(header: TableHeaderField): void {
    this.removeOrderItemIfExists(header);

    switch (header.orderType) {
      case OrderTypes.none:
        header.orderType = OrderTypes.ascending;
        break;
      case OrderTypes.ascending:
        header.orderType = OrderTypes.descending;
        break;
      default:
        header.orderType = OrderTypes.none;
    }

    this.updateOrderItem(header);
    this.updateOrderPrecedence();
    this.clickOrdering.emit();
  }

  getOrderPrecedence(header: TableHeaderField): number | undefined {
    const item = this.getHttpApiResultItemByHeader(header);

    return item ? item.precedence : undefined;
  }

  private updateOrderItem(header: TableHeaderField): void {
    this.apiResult = ApiResult.clone(this.apiResult);
    this.apiResult.addOrder(header.field, header.orderType, 1);
  }

  private removeOrderItemIfExists(header: TableHeaderField): void {
    const item = this.getHttpApiResultItemByHeader(header);
    this.apiResult = ApiResult.clone(this.apiResult);

    if (item) {
      this.apiResult.removeOrder(item);
    }
  }

  private updateOrderPrecedence(): void {
    for (let i = 0; i < this.apiResult.orders.length; i++) {
      this.apiResult.orders[i].precedence = i + 1;
    }
  }

  private getHttpApiResultItemByHeader(header: TableHeaderField): ApiResultItemOrderBy | undefined {
    this.apiResult = ApiResult.clone(this.apiResult);

    return this.apiResult.orders.find((field) => field.propertyName === header.field);
  }
}
