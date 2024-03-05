import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesControlComponent } from './times-control.component';

export const routes: Routes = [
  {
    path: '',
    component: TimesControlComponent,
    data: { title: 'Control de tiempos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesControlRoutingModule {}
