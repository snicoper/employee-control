import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { ErrorsRoutingModule } from './errors-routing.module';

@NgModule({
  declarations: [Error403Component, Error404Component],
  imports: [CommonModule, ErrorsRoutingModule, AwCardsModule, AwViewsModule]
})
export class ErrorsModule {}
