import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwYearCalendarModule } from '@aw/components/year-calendar/aw-year-calendar.module';
import { ManageHolidaysRoutingModule } from './manage-holidays-routing.module';
import { ManageHolidaysComponent } from './manage-holidays.component';
import { WorkDaysComponent } from './work-days/work-days.component';

@NgModule({
  declarations: [ManageHolidaysComponent, WorkDaysComponent],
  imports: [CommonModule, ManageHolidaysRoutingModule, AwViewsModule, AwCardsModule, AwYearCalendarModule]
})
export class ManageHolidaysModule {}
