import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { CategoryAbsence } from '@aw/models/entities/categoty-absence.model';
import { CategoryAbsencesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-category-absence-update',
  templateUrl: './category-absence-update.component.html'
})
export class CategoryAbsenceUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly categoryAbsenceId: string;

  form: FormGroup = this.fb.group({});
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

    const url = urlReplaceParams(ApiUrls.categoryAbsences.updateCategoryAbsence, { id: this.categoryAbsenceId });

    this.categoryAbsencesApiService
      .put<CategoryAbsence, ResultResponse>(categoryAbsence, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tarea editada con éxito.');
          this.router.navigateByUrl(SiteUrls.categoryAbsences.list);
        },
        error: (error) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Ausencias', SiteUrls.categoryAbsences.list)
      .add('Editar ausencia', SiteUrls.categoryAbsences.update, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      description: [this.categoryAbsence?.description, [Validators.required]],
      background: [this.categoryAbsence?.background, [Validators.required]],
      color: [this.categoryAbsence?.color, [Validators.required]],
      active: [this.categoryAbsence?.active]
    });
  }

  private loadCategoryAbsence(): void {
    this.loadingCategoryAbsence = true;
    const url = urlReplaceParams(ApiUrls.categoryAbsences.getCategoryAbsenceById, {
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
