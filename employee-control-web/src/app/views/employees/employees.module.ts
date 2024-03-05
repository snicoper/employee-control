import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwBadgesModule } from '@aw/components/badges/aw-badges.module';
import { AwBreadcrumbModule } from '@aw/components/breadcrumb/aw-breadcrumb.module';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwProgressModule } from '@aw/components/progress/aw-progress.module';
import { AwSelectorsModule } from '@aw/components/selectors/aw-selectors.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwTooltipsModule } from '@aw/components/tooltips/aw-tooltips.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeSettingsDetailsComponent } from './employee-settings/employee-settings-details/employee-settings-details.component';
import { EmployeeSettingsEditComponent } from './employee-settings/employee-settings-edit/employee-settings-edit.component';
import { EmployeeDepartmentsComponent } from './employee-view/employee-departments/employee-departments.component';
import { EmployeeDetailsComponent } from './employee-view/employee-details/employee-details.component';
import { EmployeeRolesEditComponent } from './employee-view/employee-details/employee-roles-edit/employee-roles-edit.component';
import { EmployeeSelectedService } from './employee-view/employee-selected.service';
import { EmployeeTasksComponent } from './employee-view/employee-tasks/employee-tasks.component';
import { EmployeeTimeControlComponent } from './employee-view/employee-time-control/employee-time-control.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeInviteComponent,
    EmployeeViewComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeTasksComponent,
    EmployeeTimeControlComponent,
    EmployeeRolesEditComponent,
    EmployeeDepartmentsComponent,
    EmployeeSettingsDetailsComponent,
    EmployeeSettingsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule,
    NgApexchartsModule,
    EmployeesRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule,
    AwTablesModule,
    AwPaginationModule,
    AwSpinnerModule,
    AwBreadcrumbModule,
    AwColorsModule,
    AwPipesModule,
    AwDirectivesModule,
    AwSelectorsModule,
    AwProgressModule,
    AwBadgesModule,
    AwTablesModule,
    AwTooltipsModule
  ],
  providers: [BsModalService, EmployeeSelectedService]
})
export class EmployeesModule {}
