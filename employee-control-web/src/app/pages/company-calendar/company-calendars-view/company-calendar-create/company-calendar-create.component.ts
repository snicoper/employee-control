import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from '../../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormInputComponent } from '../../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { BadRequest } from '../../../../models/bad-request';
import { CompanyCalendar } from '../../../../models/entities/company-calendar.model';
import { ResultResponse } from '../../../../models/result-response.model';
import { CompanyCalendarsApiService } from '../../../../services/api/company-calendars-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'aw-company-calendar-create',
  templateUrl: './company-calendar-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    FormInputComponent,
    FormCheckboxComponent,
    NonFieldErrorsComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanyCalendarCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const companyCalendar = this.form.value as CompanyCalendar;

    this.companyCalendarsApiService
      .post<CompanyCalendar, ResultResponse>(companyCalendar, ApiUrl.companyCalendar.createCompanyCalendar)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Calendario creado con éxito');
          this.router.navigateByUrl(SiteUrl.companyCalendar.list);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb;
    this.breadcrumb
      .add('Calendarios', SiteUrl.companyCalendar.calendar, '')
      .add('Lista de calendarios', SiteUrl.companyCalendar.list, '')
      .add('Crear calendario', SiteUrl.companyCalendar.create, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.max(25)]],
      description: ['', [Validators.required, Validators.max(256)]],
      default: [false]
    });
  }
}
