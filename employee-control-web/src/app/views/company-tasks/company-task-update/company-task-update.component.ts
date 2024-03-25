import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { BadRequest } from '@aw/models/_index';
import { CompanyTask } from '@aw/models/entities/company-task.model';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormColorComponent } from '../../../components/forms/inputs/form-color/form-color.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';

@Component({
  selector: 'aw-company-task-update',
  templateUrl: './company-task-update.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    BadgeComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormColorComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanyTaskUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly toastrService = inject(ToastrService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: string;
  readonly urlCompanyTaskDetails: string;

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingCompanyTask = false;
  loadingForm = false;
  submitted = false;
  companyTask: CompanyTask | undefined;

  constructor() {
    this.companyTaskId = this.route.snapshot.paramMap.get('id') as string;
    this.urlCompanyTaskDetails = urlReplaceParams(SiteUrls.companyTasks.details, { id: this.companyTaskId });
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

    const url = urlReplaceParams(ApiUrls.companyTasks.updateCompanyTask, { id: this.companyTaskId });

    this.companyTaskApiService
      .put<CompanyTask, undefined>(companyTask, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tarea editada con éxito.');
          this.router.navigateByUrl(this.urlCompanyTaskDetails);
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Tareas', SiteUrls.companyTasks.list)
      .add('Detalles', this.urlCompanyTaskDetails)
      .add('Editar', SiteUrls.companyTasks.update, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [this.companyTask?.name, [Validators.required]],
      background: [this.companyTask?.background, [Validators.required]],
      color: [this.companyTask?.color, [Validators.required]],
      active: [this.companyTask?.active]
    });
  }

  private loadCompanyTask(): void {
    this.loadingCompanyTask = true;
    const url = urlReplaceParams(ApiUrls.companyTasks.updateCompanyTask, { id: this.companyTaskId });

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
