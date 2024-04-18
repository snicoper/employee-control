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
import { CategoryAbsence } from '../../../models/entities/category-absence.model';
import { ResultResponse } from '../../../models/result-response.model';
import { CategoryAbsencesApiService } from '../../../services/api/category-absences-api.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'aw-category-absence-update',
  templateUrl: './category-absence-update.component.html',
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
    FormColorPickerComponent,
    FormCheckboxComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CategoryAbsenceUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackBarService);
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly categoryAbsenceId: string;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingCategoryAbsence = false;
  loadingForm = false;
  submitted = false;
  categoryAbsence: CategoryAbsence | undefined;

  constructor() {
    this.categoryAbsenceId = this.route.snapshot.paramMap.get('id') as string;
    this.loadCategoryAbsence();
    this.setBreadcrumb();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const categoryAbsence = this.form.value as CategoryAbsence;
    categoryAbsence.id = this.categoryAbsenceId;

    const url = CommonUtils.urlReplaceParams(ApiUrl.categoryAbsences.updateCategoryAbsence, {
      id: this.categoryAbsenceId
    });

    this.categoryAbsencesApiService
      .put<CategoryAbsence, ResultResponse>(categoryAbsence, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Tarea editada con éxito.');
          this.router.navigateByUrl(SiteUrl.categoryAbsences.list);
        },
        error: (error) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Ausencias', SiteUrl.categoryAbsences.list)
      .add('Editar ausencia', SiteUrl.categoryAbsences.update, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      description: [this.categoryAbsence?.description, [Validators.required]],
      background: [this.categoryAbsence?.background, [Validators.required]],
      color: [this.categoryAbsence?.color, [Validators.required]],
      active: [this.categoryAbsence?.active]
    });
  }

  private loadCategoryAbsence(): void {
    this.loadingCategoryAbsence = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.categoryAbsences.getCategoryAbsenceById, {
      id: this.categoryAbsenceId
    });

    this.categoryAbsencesApiService
      .get<CategoryAbsence>(url)
      .pipe(finalize(() => (this.loadingCategoryAbsence = false)))
      .subscribe({
        next: (result: CategoryAbsence) => {
          this.categoryAbsence = result;
          this.buildForm();
        }
      });
  }
}
