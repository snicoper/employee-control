import { Component, OnInit, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CompanyCalendar } from '../../../models/entities/company-calendar.model';
import { CompanyCalendarsApiService } from '../../../services/api/company-calendars-api.service';

@Component({
  selector: 'aw-company-calendar-selector',
  templateUrl: './company-calendar-selector.component.html',
  styleUrl: './company-calendar-selector.component.scss',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule]
})
export class CompanyCalendarSelectorComponent implements OnInit {
  private readonly companyCalendarsApiServiceService = inject(CompanyCalendarsApiService);

  companyCalendarChange = output<CompanyCalendar>();

  companyCalendars: Array<CompanyCalendar> = [];
  companyCalendarIdSelected: string | undefined;

  ngOnInit(): void {
    this.loadCompanyCalendars();
  }

  handleCompanyCalendarChange(companyCalendarId: string): void {
    const companyCalendar = this.companyCalendars.find((cc) => cc.id === companyCalendarId);

    if (companyCalendar) {
      this.companyCalendarChange.emit(companyCalendar);
    }
  }

  private loadCompanyCalendars(): void {
    this.companyCalendarsApiServiceService
      .get<Array<CompanyCalendar>>(ApiUrl.companyCalendar.getCompanyCalendars)
      .subscribe({
        next: (result: Array<CompanyCalendar>) => {
          const defaultCompanyCalendar = result.find((cc) => cc.default) as CompanyCalendar;
          this.companyCalendars = result;
          this.companyCalendarIdSelected = defaultCompanyCalendar?.id;
          this.companyCalendarChange.emit(defaultCompanyCalendar);
        }
      });
  }
}
