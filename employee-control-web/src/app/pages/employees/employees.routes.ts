import { Routes } from '@angular/router';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    title: 'Lista de empleados'
  },
  {
    path: 'invite',
    component: EmployeeInviteComponent,
    title: 'Invitar a empleado'
  },
  {
    path: ':id',
    component: EmployeeViewComponent,
    title: 'Detalles de empleado'
  },
  {
    path: ':id/update',
    component: EmployeeUpdateComponent,
    title: 'Editar empleado'
  }
];
