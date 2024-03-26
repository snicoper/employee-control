import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrls } from '../../../core/urls/_index';
import { ResultResponse } from '../../../models/_index';
import { WorkDays } from '../../../models/entities/_index';
import { WorkDaysApiService } from '../../../services/api/_index';
import { CurrentCompanyEmployeeService } from '../../../services/states/_index';
import { urlReplaceParams } from './../../../core/utils/common-utils';
import { WeekDaysEnum } from './week-days.enum';

@Component({
  selector: 'aw-company-holidays',
  templateUrl: './company-holidays.component.html',
  standalone: true,
  imports: [NgClass]
})
export class CompanyHolidaysComponent {
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly workDaysApiService = inject(WorkDaysApiService);
  private readonly toastrService = inject(ToastrService);

  workDays: WorkDays | undefined;
  weekDaysEnum = WeekDaysEnum;

  constructor() {
    this.loadWorkDays();
  }

  handleClickDay(weekDay: WeekDaysEnum): void {
    if (!this.workDays) {
      return;
    }

    switch (weekDay) {
      case WeekDaysEnum.monday:
        this.workDays.monday = !this.workDays?.monday;
        break;
      case WeekDaysEnum.tuesday:
        this.workDays.tuesday = !this.workDays?.tuesday;
        break;
      case WeekDaysEnum.wednesday:
        this.workDays.wednesday = !this.workDays?.wednesday;
        break;
      case WeekDaysEnum.thursday:
        this.workDays.thursday = !this.workDays?.thursday;
        break;
      case WeekDaysEnum.friday:
        this.workDays.friday = !this.workDays?.friday;
        break;
      case WeekDaysEnum.saturday:
        this.workDays.saturday = !this.workDays?.saturday;
        break;
      case WeekDaysEnum.sunday:
        this.workDays.sunday = !this.workDays?.sunday;
        break;
    }

    this.updateWorkDays();
  }

  private loadWorkDays(): void {
    const url = urlReplaceParams(ApiUrls.workDays.getWorkDaysByCompanyId, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id as string
    });

    this.workDaysApiService.get<WorkDays>(url).subscribe({
      next: (result: WorkDays) => {
        this.workDays = result;
      }
    });
  }

  private updateWorkDays(): void {
    if (!this.workDays) {
      return;
    }

    const url = urlReplaceParams(ApiUrls.workDays.updateWorkDays, { id: this.workDays.id });

    this.workDaysApiService.put<WorkDays, ResultResponse>(this.workDays, url).subscribe({
      next: (result: ResultResponse) => {
        if (!result.succeeded) {
          this.toastrService.error('Error al actualizar día laborable.');
        }
      },
      error: () => {
        this.toastrService.error('Error al actualizar día laborable.');
      }
    });
  }
}
