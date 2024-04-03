import { Component, inject } from '@angular/core';
import { DateTime } from 'luxon';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { WeekDays } from '../../core/types/week-days';
import { DatetimeUtils } from '../../core/utils/datetime-utils';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';

@Component({
  selector: 'aw-company-holidays-manage',
  standalone: true,
  imports: [PopoverModule, PageBaseComponent, YearCalendarComponent],
  templateUrl: './company-holidays-manage.component.html'
})
export class CompanyHolidaysManageComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);

  private nonWorkingDays: DateTime[] = [];

  date: DateTime;
  calendarDayEvents: CalendarDay[] = [];
  companyHolidays: CompanyHoliday[] = [];
  loading = true;

  constructor() {
    this.date = DateTime.local();
    this.getNonWorkingDays();

    this.loading = false;
  }

  // eslint-disable-next-line
  handleCalendarDayClick(calendarDay: CalendarDay): void {}

  /** Obtener días no laborables de la empresa de año actual. */
  private getNonWorkingDays(): void {
    const workingDaysWeek = this.workingDaysWeekStateService.get();
    const daysResult: DateTime[] = [];

    if (!workingDaysWeek?.monday) {
      const monday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.monday);
      daysResult.push(...monday);
    }

    if (!workingDaysWeek?.tuesday) {
      const tuesday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.tuesday);
      daysResult.push(...tuesday);
    }

    if (!workingDaysWeek?.wednesday) {
      const wednesday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.wednesday);
      daysResult.push(...wednesday);
    }

    if (!workingDaysWeek?.thursday) {
      const thursday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.thursday);
      daysResult.push(...thursday);
    }

    if (!workingDaysWeek?.friday) {
      const friday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.friday);
      daysResult.push(...friday);
    }

    if (!workingDaysWeek?.saturday) {
      const saturday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.saturday);
      daysResult.push(...saturday);
    }

    if (!workingDaysWeek?.sunday) {
      const sunday = DatetimeUtils.getWeekDaysFromYear(this.date, WeekDays.sunday);
      daysResult.push(...sunday);
    }

    daysResult.forEach((date: DateTime) => {
      const calendarDayEvent = {
        day: date.day,
        date: date,
        inactive: false,
        isToday: false,
        description: 'Día no laborable',
        background: '#581845',
        color: '#ffffff',
        editable: false,
        removable: false,
        canAddEvent: false
      } as CalendarDay;

      this.calendarDayEvents.push(calendarDayEvent);
    });
  }

  private loadCompanyHolidays(): void {}
}
