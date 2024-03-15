import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { HomeTestComponent } from './home-test/home-test.component';
import { TestsRoutingModule } from './tests-routing.module';

@NgModule({
  declarations: [HomeTestComponent],
  imports: [CommonModule, TestsRoutingModule, AwViewsModule]
})
export class TestsModule {}
