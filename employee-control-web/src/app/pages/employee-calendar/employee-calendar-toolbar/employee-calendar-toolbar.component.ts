import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { DateTimeFormatPipe } from '../../../pipes/date-time-format.pipe';
import { SidenavService } from '../../../services/sidenav.service';
import { EmployeeHolidayResponse } from '../employee-holiday-response.model';
import { EmployeeCalendarToolbarService } from './employee-calendar-toolvar.service';

@Component({
  selector: 'aw-employee-calendar-toolbar',
  templateUrl: './employee-calendar-toolbar.component.html',
  styleUrl: './employee-calendar-toolbar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    DateTimeFormatPipe,
    BadgeComponent
  ]
})
export class EmployeeCalendarToolbarComponent {
  private readonly employeeCalendarToolbarService = inject(EmployeeCalendarToolbarService);
  private readonly sidenavService = inject(SidenavService);

  readonly calendarDatesSelected = computed(() => this.employeeCalendarToolbarService.calendarDatesSelected());

  yearSelected = input.required<number>();
  employeeHoliday = input.required<EmployeeHolidayResponse>();

  handleCloseToolbar(): void {
    this.sidenavService.toggleSidenavToolbarState();
  }
}
