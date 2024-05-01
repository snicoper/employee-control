import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { User } from '../../../models/entities/user.model';
import { EmployeeHolidaysApiService } from '../../../services/api/employee-holidays-api.service';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { EmployeeHolidaysDetailsResponse } from './employee-holidays-details-response.model';

@Component({
  selector: 'aw-employee-holidays-details',
  templateUrl: './employee-holidays-details.component.html',
  standalone: true,
  imports: [MatCardModule, PageBaseComponent, PageHeaderComponent]
})
export class EmployeeHolidaysDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);
  private readonly employeesApiService = inject(EmployeesApiService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;
  readonly year: number;

  employee!: User;
  employeeHoliday!: EmployeeHolidaysDetailsResponse;
  loadingData = true;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loadingForm = false;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId') as string;
    this.year = parseInt(this.route.snapshot.paramMap.get('year') as string);

    this.setBreadcrumb();
    this.loadData();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Vacaciones de empleados', SiteUrl.companyHolidays.employees, '')
      .add(`Detalles ${this.year}`, SiteUrl.companyHolidays.details, '', false);
  }

  private loadData(): void {
    this.loadingData = true;

    const employeeHolidaysUrl = CommonUtils.urlReplaceParams(
      ApiUrl.employeeHolidays.getOrCreateEmployeeHolidaysByYearAndEmployeeId,
      {
        year: this.year.toString(),
        employeeId: this.employeeId
      }
    );

    const employeesUrl = CommonUtils.urlReplaceParams(ApiUrl.employees.getEmployeeById, { id: this.employeeId });

    type resultResponse = { employeeHoliday$: EmployeeHolidaysDetailsResponse; employee$: User };

    forkJoin({
      employeeHoliday$: this.employeeHolidaysApiService.get<EmployeeHolidaysDetailsResponse>(employeeHolidaysUrl),
      employee$: this.employeesApiService.get<User>(employeesUrl)
    })
      .pipe(finalize(() => (this.loadingData = false)))
      .subscribe({
        next: (result: resultResponse) => {
          this.employeeHoliday = result.employeeHoliday$;
          this.employee = result.employee$;

          this.buildForm();
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      totalDays: [this.employeeHoliday.totalDays, [Validators.required, Validators.min(1)]],
      consumed: [{ value: this.employeeHoliday.consumed, disabled: true }],
      available: [{ value: this.employeeHoliday.available, disabled: true }]
    });
  }
}
