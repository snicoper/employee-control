import { Routes } from '@angular/router';
import { ManageHolidaysComponent } from './manage-holidays.component';

export const routes: Routes = [
  {
    path: '',
    component: ManageHolidaysComponent,
    title: 'Días festivos'
  }
];
