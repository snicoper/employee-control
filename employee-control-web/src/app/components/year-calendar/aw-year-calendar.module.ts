import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '../cards/aw-cards.module';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { YearCalendarComponent } from './year-calendar.component';

@NgModule({
  declarations: [YearCalendarComponent, MonthCalendarComponent],
  imports: [CommonModule, AwCardsModule],
  exports: [YearCalendarComponent, MonthCalendarComponent]
})
export class AwYearCalendarModule {}
