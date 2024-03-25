import { Routes } from '@angular/router';
import { TimeControlRecordCreateComponent } from './time-control-record-create/time-control-record-create.component';
import { TimeControlRecordListComponent } from './time-control-record-list/time-control-record-list.component';
import { TimeControlRecordUpdateComponent } from './time-control-record-update/time-control-record-update.component';

export const routes: Routes = [
  {
    path: '',
    component: TimeControlRecordListComponent,
    title: 'Registro de tiempos'
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
