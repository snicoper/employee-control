import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export interface TableHeaderField {
  field: string;
  text: string;
  sortable: boolean;
  orderType: OrderTypes;
  orderPrecedence?: number;
  filterable?: boolean;
}
