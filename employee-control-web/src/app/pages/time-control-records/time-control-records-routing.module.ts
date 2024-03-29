import { Routes } from '@angular/router';
import { TimeControlRecordCreateComponent } from './time-control-record-create/time-control-record-create.component';
import { TimeControlRecordDetailsComponent } from './time-control-record-details/time-control-record-details.component';
import { TimeControlRecordListComponent } from './time-control-record-list/time-control-record-list.component';
import { TimeControlRecordUpdateComponent } from './time-control-record-update/time-control-record-update.component';

export const routes: Routes = [
  {
    path: '',
    component: TimeControlRecordListComponent,
    title: 'Registro de tiempos'
  },

  {
    path: ':id/details',
    component: TimeControlRecordDetailsComponent,
    title: 'Detalles de registro de tiempo'
  },
  {
    path: 'create',
    component: TimeControlRecordCreateComponent,
    title: 'Añadir un registro de tiempo'
  },
  {
    path: ':id/update',
    component: TimeControlRecordUpdateComponent,
    title: 'Actualizar un registro de tiempo'
  }
];
