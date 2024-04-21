import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { EmployeeSettings } from '../../../models/entities/employee-settings.model';
import { EmployeesApiService } from '../../../services/api/employees-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { EmployeeSettingsStateService } from '../../../services/states/employee-settings-state.service';

@Component({
  selector: 'aw-employee-settings-update',
  templateUrl: './employee-settings-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatDividerModule,
    PageBaseComponent,
    PageHeaderComponent,
    FormTimezoneComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class EmployeeSettingsUpdateComponent {
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  readonly employeeSettings = computed(() => this.employeeSettingsStateService.employeeSettings());

  readonly breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  nowWithOriginalTimezone = '';
  nowWithTimezoneSelected = '';

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
    this.setNowWithOriginalTimezone();
    this.eventListener();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const employeeSettings = Object.assign({} as EmployeeSettings, this.employeeSettings());
    const url = CommonUtils.urlReplaceParams(ApiUrl.employees.updateEmployeeSettings, { id: employeeSettings.userId });

    employeeSettings.timezone = this.form.get('timezone')?.value;

    this.employeesApiService
      .put<EmployeeSettings, EmployeeSettings>(employeeSettings, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: EmployeeSettings) => {
          if (result) {
            this.snackBarService.success('Configuración actualizada con éxito');
            this.router.navigateByUrl(SiteUrl.employeeSettings.settings);
            this.employeeSettingsStateService.refresh();
          }
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Configuración de empleado', SiteUrl.employeeSettings.settings)
      .add('Editar', SiteUrl.employeeSettings.update, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithOriginalTimezone = DateTime.local()
      .setZone(this.employeeSettings()?.timezone)
      .toLocaleString(DateTime.TIME_SIMPLE);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      timezone: [this.employeeSettings()?.timezone, [Validators.required]]
    });
  }

  private eventListener(): void {
    this.form.controls['timezone'].valueChanges.pipe(takeUntilDestroyed()).subscribe((timezone: string) => {
      this.setNowWithOriginalTimezone();
      this.nowWithTimezoneSelected = DateTime.local().setZone(timezone).toLocaleString(DateTime.TIME_SIMPLE);
    });
  }
}
