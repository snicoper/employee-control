import { Routes } from '@angular/router';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsUpdateComponent } from './company-settings-update/company-settings-update.component';

export const routes: Routes = [
  {
    path: '',
    component: CompanySettingsDetailsComponent,
    title: 'Configuración de empresa'
  },
  {
    path: 'update',
    component: CompanySettingsUpdateComponent,
    title: 'Editar configuración de empresa'
  }
];
