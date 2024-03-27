import { TableHeaderField } from '../../../components/tables/table-header/table-header-field.interface';
import { OrderTypes } from '../../../core/features/api-result/_index';

export const timeControlRecordListTableHeaders: TableHeaderField[] = [
  {
    field: 'user.firstName',
    text: 'Nombre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'user.lastName',
    text: 'Apellidos',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: true
  },
  {
    field: 'start',
    text: 'Apertura',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'finish',
    text: 'Cierre',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'closedBy',
    text: 'Cerrado por',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'timeState',
    text: 'Estado',
    sortable: true,
    orderType: OrderTypes.none,
    filterable: false
  },
  {
    field: 'duration',
    text: 'Duración',
    sortable: false,
    orderType: OrderTypes.none,
    filterable: false
  },

  {
    field: 'incidence',
    text: 'Incidencias',
    sortable: true,
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
