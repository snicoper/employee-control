import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { BadRequest } from '../../../models/bad-request';
import { CompanySettings } from '../../../models/entities/company-settings.model';
import { ResultResponse } from '../../../models/result-response.model';
import { CompanySettingsApiService } from '../../../services/api/company-settings-api.service';
import { CurrentCompanySettingsStateService } from '../../../services/states/current-company-settings-state.service';

@Component({
  selector: 'aw-company-settings-update',
  templateUrl: './company-settings-update.component.html',
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
export class CompanySettingsUpdateComponent {
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);
  private readonly companySettingsApiService = inject(CompanySettingsApiService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly companySettings = computed(() => this.currentCompanySettingsStateService.companySettings());

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

    const companySettings = this.form.value as CompanySettings;
    companySettings.id = this.companySettings()?.id as string;

    this.companySettingsApiService
      .put<CompanySettings, ResultResponse>(companySettings, ApiUrls.companySettings.updateCompanySettings)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Configuración actualizada con éxito');
            this.router.navigateByUrl(SiteUrls.companySettings.details);
            this.currentCompanySettingsStateService.refresh();
          }
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Configuración', SiteUrls.companySettings.details)
      .add('Editar', SiteUrls.companySettings.update, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithOriginalTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      timezone: [this.companySettings()?.timezone, [Validators.required]]
    });
  }

  private eventListener(): void {
    this.form.controls['timezone'].valueChanges.pipe(takeUntilDestroyed()).subscribe((timezone: string) => {
      this.setNowWithOriginalTimezone();
      this.nowWithTimezoneSelected = DateTime.local().setZone(timezone).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
    });
  }
}
