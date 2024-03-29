import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/types/order-type';

export const categoryAbsenceListTableHeader: TableHeaderField[] = [
  {
    field: 'description',
    text: 'Descripción',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activa',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'background',
    text: 'Fondo',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'color',
    text: 'Texto',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: '',
    text: '',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  }
];
