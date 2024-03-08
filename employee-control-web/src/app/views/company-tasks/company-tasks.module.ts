import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwBadgesModule } from '@aw/components/badges/aw-badges.module';
import { AwBreadcrumbModule } from '@aw/components/breadcrumb/aw-breadcrumb.module';
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
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskUpdateComponent } from './company-task-update/company-task-update.component';
import { CompanyTaskAddUsersComponent } from './company-task-view/company-task-add-users/company-task-add-users.component';
import { CompanyTaskDetailsComponent } from './company-task-view/company-task-details/company-task-details.component';
import { CompanyTaskSelectedService } from './company-task-view/company-task-selected.service';
import { CompanyTaskUsersComponent } from './company-task-view/company-task-users/company-task-users.component';
import { CompanyTaskViewComponent } from './company-task-view/company-task-view.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [
    CompanyTaskListComponent,
    CompanyTaskViewComponent,
    CompanyTaskCreateComponent,
    CompanyTaskDetailsComponent,
    CompanyTaskUpdateComponent,
    CompanyTaskUsersComponent,
    CompanyTaskAddUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    CompanyTaskRoutingModule,
    AwFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwButtonsModule,
    AwBreadcrumbModule,
    AwColorsModule,
    AwDualListBoxModule,
    AwPipesModule,
    AwSpinnerModule,
    AwBadgesModule
  ],
  providers: [CompanyTaskSelectedService]
})
export class CompanyTasksModule {}
