import { TableHeaderField } from '@aw/components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '@aw/core/features/api-result/_index';

export const employeeListTableHeaders: TableHeaderField[] = [
  {
    field: 'firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'email',
    text: 'Correo electrónico',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'active',
    text: 'Activa',
    sortable: true,
    orderType: OrderTypes.none
  },
  {
    field: 'emailConfirmed',
    text: 'Cuenta aceptada',
    sortable: true,
    orderType: OrderTypes.none
  }
];
