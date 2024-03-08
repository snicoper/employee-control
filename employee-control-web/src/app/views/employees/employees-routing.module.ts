import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeSettingsDetailsComponent } from './employee-settings/employee-settings-details/employee-settings-details.component';
import { EmployeeSettingsEditComponent } from './employee-settings/employee-settings-edit/employee-settings-edit.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { title: 'Lista de empleados' }
  },
  {
    path: 'invite',
    component: EmployeeInviteComponent,
    data: { title: 'Invitar a empleado' }
  },
  {
    path: 'settings',
    component: EmployeeSettingsDetailsComponent,
    data: { title: 'Configuración de usuario' }
  },
  {
    path: 'settings/edit',
    component: EmployeeSettingsEditComponent,
    data: { title: 'Editar configuración de usuario' }
  },
  {
    path: ':id',
    component: EmployeeViewComponent,
    data: { title: 'Detalles de empleado' }
  },
  {
    path: ':id/update',
    component: EmployeeUpdateComponent,
    data: { title: 'Editar empleado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
