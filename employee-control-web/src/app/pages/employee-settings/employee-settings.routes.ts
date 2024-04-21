import { Routes } from '@angular/router';
import { EmployeeSettingsDetailsComponent } from './employee-settings-details/employee-settings-details.component';
import { EmployeeSettingsUpdateComponent } from './employee-settings-update/employee-settings-update.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeSettingsDetailsComponent,
    title: 'Configuración de usuario'
  },

  {
    path: 'update',
    component: EmployeeSettingsUpdateComponent,
    title: 'Editar configuración de usuario'
  }
];
