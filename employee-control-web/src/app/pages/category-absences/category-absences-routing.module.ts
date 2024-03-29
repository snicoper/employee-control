import { Routes } from '@angular/router';
import { CategoryAbsenceCreateComponent } from './category-absence-create/category-absence-create.component';
import { CategoryAbsenceListComponent } from './category-absence-list/category-absence-list.component';
import { CategoryAbsenceUpdateComponent } from './category-absence-update/category-absence-update.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoryAbsenceListComponent,
    title: 'Categoría de ausencias'
  },
  {
    path: 'create',
    component: CategoryAbsenceCreateComponent,
    title: 'Crear categoría de ausencias'
  },
  {
    path: ':id/update',
    component: CategoryAbsenceUpdateComponent,
    title: 'Actualizar categoría de ausencias'
  }
];
