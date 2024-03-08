import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentUpdateComponent } from './department-update/department-update.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    data: { title: 'Lista de departamentos' }
  },
  {
    path: 'create',
    component: DepartmentCreateComponent,
    data: { title: 'Crea departamento' }
  },
  {
    path: ':id',
    component: DepartmentViewComponent,
    data: { title: 'Detalles departamento' }
  },
  {
    path: ':id/update',
    component: DepartmentUpdateComponent,
    data: { title: 'Editar departamento' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}
