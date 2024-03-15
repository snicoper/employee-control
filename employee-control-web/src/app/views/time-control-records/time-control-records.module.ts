import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { TimeControlRecordListComponent } from '@aw/views/time-control-records/time-control-record-list/time-control-record-list.component';
import { TimeControlRecordCreateFormComponent } from './time-control-record-create/time-control-record-create-form/time-control-record-create-form.component';
import { TimeControlRecordCreateComponent } from './time-control-record-create/time-control-record-create.component';
import { TimeControlRecordCreateService } from './time-control-record-create/time-control-record-create.service';
import { TimeControlSelectEmployeeComponent } from './time-control-record-create/time-control-select-employee/time-control-select-employee.component';
import { TimeControlRecordUpdateComponent } from './time-control-record-update/time-control-record-update.component';
import { TimeControlRecordsRoutingModule } from './time-control-records-routing.module';

@NgModule({
  declarations: [
    TimeControlRecordListComponent,
    TimeControlRecordUpdateComponent,
    TimeControlRecordCreateComponent,
    TimeControlSelectEmployeeComponent,
    TimeControlRecordCreateFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TimeControlRecordsRoutingModule,
    AwDirectivesModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwPipesModule,
    AwColorsModule,
    AwButtonsModule,
    AwFormsModule
  ],
  providers: [TimeControlRecordCreateService]
})
export class TimeControlRecordsModule {}
