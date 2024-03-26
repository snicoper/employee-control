import { TableHeaderField } from '../../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../../core/features/api-result/_index';

export const employeeTasksTableHeaders: TableHeaderField[] = [
  {
    field: 'name',
    text: 'Nombre',
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
  }
];
