import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { CompanyCalendarSelectorComponent } from '../../components/selectors/company-calendar-selector/company-calendar-selector.component';
import { YearSelectorComponent } from '../../components/selectors/year-selector/year-selector.component';
import { CalendarClassColor } from '../../components/year-calendar-view/calendar-class-color';
import { CalendarEvent } from '../../components/year-calendar-view/calendar-event.model';
import { YearCalendarViewComponent } from '../../components/year-calendar-view/year-calendar-view.component';
import { WeekDay } from '../../core/types/week-day';
import { ApiUrl } from '../../core/urls/api-urls';
import { SiteUrl } from '../../core/urls/site-urls';
import { CommonUtils } from '../../core/utils/common-utils';
import { DateTimeUtils } from '../../core/utils/datetime-utils';
import { CompanyCalendar } from '../../models/entities/company-calendar.model';
import { CompanyHoliday } from '../../models/entities/company-holiday.model';
import { CompanyHolidaysApiService } from '../../services/api/company-holidays-api.service';
import { CompanySettingsStateService } from '../../services/states/company-settings-state.service';
import { WorkingDaysWeekStateService } from '../../services/states/working-days-week-state.service';
import { CompanyHolidayCreateComponent } from './company-holiday-create/company-holiday-create.component';
import { CompanyHolidayUpdateComponent } from './company-holiday-update/company-holiday-update.component';

@Component({
  selector: 'aw-company-holidays-manage',
  templateUrl: './company-calendar.component.html',
  styleUrl: './company-calendar.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PageBaseComponent,
    PageHeaderComponent,
    YearCalendarViewComponent,
    YearSelectorComponent,
    CompanyCalendarSelectorComponent
  ]
})
export class CompanyCalendarComponent {
  private readonly workingDaysWeekStateService = inject(WorkingDaysWeekStateService);
  private readonly companyHolidaysApiService = inject(CompanyHolidaysApiService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly matDialog = inject(MatDialog);

  /** Días de trabajo en el año seleccionado. */
  private workingDaysInYear!: number;
  /** Días de la semana laborables. */
  private workingDaysInWeek!: number;

  readonly breadcrumb = new BreadcrumbCollection();
  readonly siteUrl = SiteUrl;

  yearSelected = DateTime.local();
  companyCalendarSelected!: CompanyCalendar;
  calendarEvents: Array<CalendarEvent> = [];
  loading = true;
  workingHoursYear = 0;

  constructor() {
    this.setBreadcrumb();
  }

  /** Se inicializa aquí,  */
  handleCompanyCalendarChange(companyCalendar: CompanyCalendar): void {
    this.companyCalendarSelected = companyCalendar;
    this.initialize();
  }

  handleYearSelectorChange(year: DateTime): void {
    this.yearSelected = year;
    this.initialize();
  }

  handleSelectChange(calendarEvent: CalendarEvent): void {
    if (calendarEvent.description && calendarEvent.selectable) {
      this.updateHolidayOpenDialog(calendarEvent);
    } else {
      this.createHolidayOpenDialog(calendarEvent);
    }
  }

  private createHolidayOpenDialog(calendarEvent: CalendarEvent): void {
    const dialogRef = this.matDialog.open(CompanyHolidayCreateComponent, {
      data: { calendarEvent: calendarEvent, companyCalendarId: this.companyCalendarSelected.id }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initialize();
    });
  }

  private updateHolidayOpenDialog(calendarEvent: CalendarEvent): void {
    const dialogRef = this.matDialog.open(CompanyHolidayUpdateComponent, {
      data: { calendarEvent: calendarEvent }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.initialize();
    });
  }

  /** Obtener días no laborables de la empresa de año actual. */
  private parseNonWorkingDays(): void {
    const nonWorkingDaysWeek = this.workingDaysWeekStateService.get();
    const nonWorkingDaysWeekResult: Array<DateTime> = [];

    if (!nonWorkingDaysWeek?.monday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Monday));
    }

    if (!nonWorkingDaysWeek?.tuesday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Tuesday));
    }

    if (!nonWorkingDaysWeek?.wednesday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Wednesday));
    }

    if (!nonWorkingDaysWeek?.thursday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Thursday));
    }

    if (!nonWorkingDaysWeek?.friday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Friday));
    }

    if (!nonWorkingDaysWeek?.saturday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Saturday));
    }

    if (!nonWorkingDaysWeek?.sunday) {
      nonWorkingDaysWeekResult.push(...this.getWorkingDayWeek(WeekDay.Sunday));
    }

    nonWorkingDaysWeekResult.forEach((date: DateTime) => {
      const calendarDayEvent = {
        date: date,
        description: 'Día no laborable',
        cssClass: CalendarClassColor.NotWorkingDay,
        selectable: false
      } as CalendarEvent;

      this.calendarEvents.push(calendarDayEvent);
    });

    this.loadCompanyHolidays();
  }

  private loadCompanyHolidays(): void {
    const url = CommonUtils.urlReplaceParams(
      ApiUrl.companyCalendarHolidays.getCompanyCalendarHolidaysByCompanyCalendarIdAndYear,
      {
        companyCalendarId: this.companyCalendarSelected.id,
        year: String(this.yearSelected.year)
      }
    );

    this.companyHolidaysApiService.get<Array<CompanyHoliday>>(url).subscribe({
      next: (result: Array<CompanyHoliday>) => {
        this.workingDaysInYear -= result.length;
        this.parseCompanyHolidays(result);
      }
    });
  }

  private parseCompanyHolidays(companyHolidays: Array<CompanyHoliday>): void {
    companyHolidays.forEach((ch) => {
      const date = DateTime.fromISO(String(ch.date));

      const calendarDayEvent = {
        id: ch.id,
        date: date,
        description: ch.description,
        cssClass: CalendarClassColor.CompanyHoliday,
        selectable: true
      } as CalendarEvent;

      this.calendarEvents.push(calendarDayEvent);
    });

    this.calculateWorkingHoursYear();

    this.loading = false;
  }

  /** Obtener toas las fechas de un año por su week day. */
  private getWorkingDayWeek(weekDay: WeekDay): DateTime[] {
    const weekDays = DateTimeUtils.weekDaysFromYear(this.yearSelected, weekDay);
    this.workingDaysInYear -= weekDays.length;
    this.workingDaysInWeek -= 1;

    return weekDays;
  }

  /** Calcular horas de trabajo, no aplica vacaciones de empleado u otros días libres. */
  private calculateWorkingHoursYear(): void {
    const dailyHours =
      (this.companySettingsStateService.companySettings()?.weeklyWorkingHours as number) / this.workingDaysInWeek;

    this.workingHoursYear = Math.abs(Math.round(dailyHours * this.workingDaysInYear));
    this.loading = false;
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Calendarios', SiteUrl.companyCalendar.calendar, '', false);
  }

  /** Inicializa cálculos y obtención de datos. */
  private initialize(): void {
    this.loading = true;
    this.calendarEvents = [];
    this.workingHoursYear = 0;
    this.workingDaysInWeek = 7;
    this.workingDaysInYear = this.yearSelected.daysInYear;

    this.parseNonWorkingDays();
  }
}
