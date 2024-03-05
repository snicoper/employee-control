import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTestComponent } from './home-test/home-test.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {}
