import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAbsenceCreateComponent } from './category-absence-create/category-absence-create.component';
import { CategoryAbsenceEditComponent } from './category-absence-edit/category-absence-edit.component';
import { CategoryAbsenceListComponent } from './category-absence-list/category-absence-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryAbsenceListComponent,
    data: { title: 'Categoría de ausencias' }
  },
  {
    path: 'create',
    component: CategoryAbsenceCreateComponent,
    data: { title: 'Crear categoría de ausencias' }
  },
  {
    path: 'update',
    component: CategoryAbsenceEditComponent,
    data: { title: 'Actualizar categoría de ausencias' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryAbsenceRoutingModule {}
