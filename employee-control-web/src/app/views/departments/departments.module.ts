import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AwBadgesModule } from '@aw/components/badges/aw-badges.module';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwDualListBoxModule } from '@aw/components/dual-list-box/aw-dual-list-box.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentUpdateComponent } from './department-update/department-update.component';
import { DepartmentAddUsersComponent } from './department-view/department-add-users/department-add-users.component';
import { DepartmentDetailsComponent } from './department-view/department-details/department-details.component';
import { DepartmentSelectedService } from './department-view/department-selected.service';
import { DepartmentUsersComponent } from './department-view/department-users/department-users.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { DepartmentRoutingModule } from './departments-routing.module';

@NgModule({
  declarations: [
    DepartmentCreateComponent,
    DepartmentListComponent,
    DepartmentUpdateComponent,
    DepartmentViewComponent,
    DepartmentDetailsComponent,
    DepartmentUsersComponent,
    DepartmentAddUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    DepartmentRoutingModule,
    AwViewsModule,
    AwFormsModule,
    AwSpinnerModule,
    AwCardsModule,
    AwColorsModule,
    AwButtonsModule,
    AwTablesModule,
    AwPaginationModule,
    AwPipesModule,
    AwDualListBoxModule,
    AwBadgesModule
  ],
  providers: [DepartmentSelectedService]
})
export class DepartmentsModule {}
