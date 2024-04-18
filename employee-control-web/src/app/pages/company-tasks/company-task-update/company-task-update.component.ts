import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormColorPickerComponent } from '../../../components/forms/inputs/form-color-picker/form-color-picker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { CompanyTask } from '../../../models/entities/company-task.model';
import { CompanyTaskApiService } from '../../../services/api/company-task-api.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'aw-company-task-update',
  templateUrl: './company-task-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    BadgeComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormColorPickerComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanyTaskUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly snackBarService = inject(SnackBarService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: string;
  readonly urlCompanyTaskDetails: string;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingCompanyTask = false;
  loadingForm = false;
  submitted = false;
  companyTask: CompanyTask | undefined;

  constructor() {
    this.companyTaskId = this.route.snapshot.paramMap.get('id') as string;
    this.urlCompanyTaskDetails = CommonUtils.urlReplaceParams(SiteUrl.companyTasks.details, {
      id: this.companyTaskId
    });
    this.loadCompanyTask();
    this.setBreadcrumb();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const companyTask = this.form.value as CompanyTask;
    companyTask.id = this.companyTaskId;

    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.updateCompanyTask, { id: this.companyTaskId });

    this.companyTaskApiService
      .put<CompanyTask, undefined>(companyTask, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tarea editada con éxito.');
          this.router.navigateByUrl(this.urlCompanyTaskDetails);
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Tareas', SiteUrl.companyTasks.list)
      .add('Detalles', this.urlCompanyTaskDetails)
      .add('Editar', SiteUrl.companyTasks.update, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.companyTask?.name, [Validators.required]],
      background: [this.companyTask?.background, [Validators.required]],
      color: [this.companyTask?.color, [Validators.required]],
      active: [this.companyTask?.active]
    });
  }

  private loadCompanyTask(): void {
    this.loadingCompanyTask = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.companyTasks.updateCompanyTask, { id: this.companyTaskId });

    this.companyTaskApiService
      .get<CompanyTask>(url)
      .pipe(finalize(() => (this.loadingCompanyTask = false)))
      .subscribe({
        next: (result: CompanyTask) => {
          this.companyTask = result;
          this.buildForm();
        }
      });
  }
}
