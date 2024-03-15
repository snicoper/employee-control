import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsUpdateComponent } from './company-settings-update/company-settings-update.component';

const routes: Routes = [
  {
    path: '',
    component: CompanySettingsDetailsComponent,
    data: { title: 'Configuración de empresa' }
  },
  {
    path: 'update',
    component: CompanySettingsUpdateComponent,
    data: { title: 'Editar configuración de empresa' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule {}
