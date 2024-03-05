import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskEditComponent } from './company-task-edit/company-task-edit.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskViewComponent } from './company-task-view/company-task-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTaskListComponent,
    data: { title: 'Lista de tareas' }
  },
  {
    path: 'create',
    component: CompanyTaskCreateComponent,
    data: { title: 'Crear nueva tareas' }
  },
  {
    path: ':id',
    component: CompanyTaskViewComponent,
    data: { title: 'Detalles de tarea' }
  },
  {
    path: ':id/edit',
    component: CompanyTaskEditComponent,
    data: { title: 'Editar tarea' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTaskRoutingModule {}
