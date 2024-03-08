import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwBadgesModule } from '@aw/components/badges/aw-badges.module';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { CategoryAbsenceCreateComponent } from './category-absence-create/category-absence-create.component';
import { CategoryAbsenceListComponent } from './category-absence-list/category-absence-list.component';
import { CategoryAbsenceUpdateComponent } from './category-absence-update/category-absence-update.component';
import { CategoryAbsencesRoutingModule } from './category-absences-routing.module';

@NgModule({
  declarations: [CategoryAbsenceListComponent, CategoryAbsenceCreateComponent, CategoryAbsenceUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryAbsencesRoutingModule,
    AwCardsModule,
    AwViewsModule,
    AwFormsModule,
    AwBadgesModule,
    AwButtonsModule,
    AwTablesModule,
    AwPaginationModule,
    AwPipesModule,
    AwColorsModule
  ]
})
export class CategoryAbsencesModule {}
