import { Routes } from '@angular/router';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeSettingsDetailsComponent } from './employee-settings/employee-settings-details/employee-settings-details.component';
import { EmployeeSettingsEditComponent } from './employee-settings/employee-settings-edit/employee-settings-edit.component';
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
    path: 'settings',
    component: EmployeeSettingsDetailsComponent,
    title: 'Configuración de usuario'
  },
  {
    path: 'settings/edit',
    component: EmployeeSettingsEditComponent,
    title: 'Editar configuración de usuario'
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
