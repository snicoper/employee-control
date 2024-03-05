import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CategoryAbsenceCreateComponent } from './category-absence-create/category-absence-create.component';
import { CategoryAbsenceEditComponent } from './category-absence-edit/category-absence-edit.component';
import { CategoryAbsenceListComponent } from './category-absence-list/category-absence-list.component';
import { CategoryAbsenceRoutingModule } from './category-absence-routing.module';

@NgModule({
  declarations: [CategoryAbsenceListComponent, CategoryAbsenceCreateComponent, CategoryAbsenceEditComponent],
  imports: [CommonModule, CategoryAbsenceRoutingModule, AwCardsModule, AwViewsModule]
})
export class CategoryAbsenceModule {}
