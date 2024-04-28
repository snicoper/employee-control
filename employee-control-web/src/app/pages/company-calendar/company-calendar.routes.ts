import { Routes } from '@angular/router';
import { CompanyCalendarComponent } from './company-calendar.component';
import { CompanyCalendarCreateComponent } from './company-calendars-view/company-calendar-create/company-calendar-create.component';
import { CompanyCalendarDetailsComponent } from './company-calendars-view/company-calendar-details/company-calendar-details.component';
import { CompanyCalendarListComponent } from './company-calendars-view/company-calendar-list/company-calendar-list.component';
import { CompanyCalendarUpdateComponent } from './company-calendars-view/company-calendar-update/company-calendar-update.component';

export const routes: Routes = [
  {
    path: '',
    component: CompanyCalendarComponent,
    title: 'Edición días festivos'
  },
  {
    path: 'list',
    component: CompanyCalendarListComponent,
    title: 'Lista de calendarios'
  },
  {
    path: 'create',
    component: CompanyCalendarCreateComponent,
    title: 'Crear calendario'
  },
  {
    path: ':id/details',
    component: CompanyCalendarDetailsComponent,
    title: 'Detalles de calendario'
  },
  {
    path: ':id/update',
    component: CompanyCalendarUpdateComponent,
    title: 'Actualizar de calendario'
  }
];
