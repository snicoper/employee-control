import { TableHeaderField } from '../../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../../core/features/api-result/types/order-type';

export const employeeDepartmentsTableHeaders: TableHeaderField[] = [
  {
    field: 'name',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activo',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  }
];
