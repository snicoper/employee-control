import { Component, inject } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { CalendarDay } from '../../components/year-calendar/month-calendar/calendar-day.model';
import { YearCalendarComponent } from '../../components/year-calendar/year-calendar.component';
import { WeekDays } from '../../core/types/week-days';
import { DateUtils } from '../../core/utils/date-utils';
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

  private nonWorkingDays: Date[] = [];

  companyHolidays: CompanyHoliday[] = [];
  year = new Date().getFullYear();
  calendarDayEvents: CalendarDay[] = [];

  constructor() {
    this.getNonWorkingDays();
  }

  // eslint-disable-next-line
  handleCalendarDayClick(calendarDay: CalendarDay): void {}

  /** Obtener días no laborables de la empresa de año actual. */
  private getNonWorkingDays(): void {
    const workingDaysWeek = this.workingDaysWeekStateService.get();
    const daysResult: Date[] = [];

    if (!workingDaysWeek?.monday) {
      const monday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.monday);
      daysResult.push(...monday);
    }

    if (!workingDaysWeek?.tuesday) {
      const tuesday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.tuesday);
      daysResult.push(...tuesday);
    }

    if (!workingDaysWeek?.wednesday) {
      const wednesday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.wednesday);
      daysResult.push(...wednesday);
    }

    if (!workingDaysWeek?.thursday) {
      const thursday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.thursday);
      daysResult.push(...thursday);
    }

    if (!workingDaysWeek?.friday) {
      const friday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.friday);
      daysResult.push(...friday);
    }

    if (!workingDaysWeek?.saturday) {
      const saturday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.saturday);
      daysResult.push(...saturday);
    }

    if (!workingDaysWeek?.sunday) {
      const sunday = DateUtils.getWeekDaysFromYear(this.year, WeekDays.sunday);
      daysResult.push(...sunday);
    }

    daysResult.forEach((date: Date) => {
      const calendarDayEvent = {
        day: date.getDate(),
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
