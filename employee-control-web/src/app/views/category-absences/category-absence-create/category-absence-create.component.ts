import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { getRandomColorHexadecimal } from '@aw/core/utils/_index';
import { BadRequest } from '@aw/models/bad-request';
import { JwtService } from '@aw/services/_index';
import { CategoryAbsencesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CategoryAbsenceCreateRequest } from './category-absence-create-request.model';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { FormColorComponent } from '../../../components/forms/inputs/form-color/form-color.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-category-absence-create',
    templateUrl: './category-absence-create.component.html',
    standalone: true,
    imports: [ViewBaseComponent, ViewHeaderComponent, CardComponent, FormsModule, ReactiveFormsModule, NonFieldErrorsComponent, BadgeComponent, FormInputComponent, FormColorComponent, BtnBackComponent, BtnLoadingComponent]
})
export class CategoryAbsenceCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;
  siteUrls = SiteUrls;

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
    const categoryAbsenceCreateRequest = this.form.value as CategoryAbsenceCreateRequest;
    categoryAbsenceCreateRequest.companyId = this.jwtService.getCompanyId();

    this.categoryAbsencesApiService
      .post<CategoryAbsenceCreateRequest, string>(
        categoryAbsenceCreateRequest,
        ApiUrls.categoryAbsences.createCompanyAbsence
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Ausencia creada con éxito');
          this.router.navigateByUrl(SiteUrls.categoryAbsences.list);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Ausencias', SiteUrls.categoryAbsences.list)
      .add('Crear ausencia', SiteUrls.categoryAbsences.create, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required]],
      background: [getRandomColorHexadecimal(), [Validators.required]],
      color: [getRandomColorHexadecimal(), [Validators.required]]
    });
  }
}
