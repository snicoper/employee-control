import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CommonUtils } from '../../../../core/utils/common-utils';
import { BadRequest } from '../../../../models/bad-request';
import { CompanyCalendar } from '../../../../models/entities/company-calendar.model';
import { ResultResponse } from '../../../../models/result-response.model';
import { CompanyCalendarsApiService } from '../../../../services/api/company-calendars-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'aw-company-calendar-update',
  templateUrl: './company-calendar-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    PageBaseComponent,
    PageHeaderComponent,
    FormInputComponent,
    FormCheckboxComponent,
    NonFieldErrorsComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanyCalendarUpdateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly companyCalendarsApiService = inject(CompanyCalendarsApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;
  companyCalendarId = '';
  loadingCompanyCalendar = false;
  companyCalendar!: CompanyCalendar;

  ngOnInit(): void {
    this.companyCalendarId = this.route.snapshot.paramMap.get('id') as string;
    this.setBreadcrumb();
    this.loadCompanyCalendar();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const url = CommonUtils.urlReplaceParams(ApiUrl.companyCalendar.updateCompanyCalendar, {
      id: this.companyCalendarId
    });

    const companyCalendar = this.form.value as CompanyCalendar;
    companyCalendar.id = this.companyCalendarId;

    this.companyCalendarsApiService
      .put<CompanyCalendar, ResultResponse>(companyCalendar, url)
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
      .add('Actualizar calendario', SiteUrl.companyCalendar.update, '', false);
  }

  private loadCompanyCalendar(): void {
    this.loadingCompanyCalendar = true;

    const url = CommonUtils.urlReplaceParams(ApiUrl.companyCalendar.getCompanyCalendarById, {
      id: this.companyCalendarId
    });

    this.companyCalendarsApiService
      .get<CompanyCalendar>(url)
      .pipe(finalize(() => (this.loadingCompanyCalendar = false)))
      .subscribe({
        next: (result: CompanyCalendar) => {
          this.companyCalendar = result;
          this.buildForm();
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.companyCalendar.name, [Validators.required, Validators.max(25)]],
      description: [this.companyCalendar.description, [Validators.required, Validators.max(256)]],
      default: [this.companyCalendar.default]
    });
  }
}
