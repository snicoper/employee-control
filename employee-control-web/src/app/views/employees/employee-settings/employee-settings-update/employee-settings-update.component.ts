import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { FormTimezoneComponent } from '../../../../components/forms/inputs/form-timezone/form-timezone.component';
import { ViewBaseComponent } from '../../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../../components/views/view-header/view-header.component';
import { ApiUrls, SiteUrls } from '../../../../core/urls/_index';
import { urlReplaceParams } from '../../../../core/utils/_index';
import { BadRequest } from '../../../../models/_index';
import { EmployeeSettings } from '../../../../models/entities/_index';
import { EmployeesApiService } from '../../../../services/api/_index';
import { EmployeeSettingsStateService } from '../../../../services/states/_index';

@Component({
  selector: 'aw-employee-settings-update',
  templateUrl: './employee-settings-update.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    FormTimezoneComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class EmployeeSettingsUpdateComponent {
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly employeeSettings = computed(() => this.employeeSettingsStateService.employeeSettings());

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  nowWithOriginalTimezone = '';
  nowWithTimezoneSelected = '';
  siteUrls = SiteUrls;

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
    const url = urlReplaceParams(ApiUrls.employees.updateEmployeeSettings, { id: employeeSettings.userId });

    employeeSettings.timezone = this.form.get('timezone')?.value;

    this.employeesApiService
      .put<EmployeeSettings, EmployeeSettings>(employeeSettings, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: EmployeeSettings) => {
          if (result) {
            this.toastrService.success('Configuración actualizada con éxito');
            this.router.navigateByUrl(SiteUrls.employees.settings);
            this.employeeSettingsStateService.refresh();
          }
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Configuración de empleado', SiteUrls.employees.settings)
      .add('Editar', SiteUrls.employees.settingsUpdate, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithOriginalTimezone = DateTime.local()
      .setZone(this.employeeSettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      timezone: [this.employeeSettings()?.timezone, [Validators.required]]
    });
  }

  private eventListener(): void {
    this.form.controls['timezone'].valueChanges.pipe(takeUntilDestroyed()).subscribe((timezone: string) => {
      this.setNowWithOriginalTimezone();
      this.nowWithTimezoneSelected = DateTime.local().setZone(timezone).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
    });
  }
}
