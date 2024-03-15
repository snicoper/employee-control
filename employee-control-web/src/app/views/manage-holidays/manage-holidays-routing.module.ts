import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHolidaysComponent } from './manage-holidays.component';

export const routes: Routes = [
  {
    path: '',
    component: ManageHolidaysComponent,
    data: { title: 'Días festivos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHolidaysRoutingModule {}
