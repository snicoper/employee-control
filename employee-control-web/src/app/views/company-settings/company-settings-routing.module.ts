import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsEditComponent } from './company-settings-edit/company-settings-edit.component';

const routes: Routes = [
  {
    path: 'details',
    component: CompanySettingsDetailsComponent,
    data: { title: 'Configuración de empresa' }
  },
  {
    path: 'edit',
    component: CompanySettingsEditComponent,
    data: { title: 'Editar configuración de empresa' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule {}
