import { NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormColorPickerComponent } from '../../../components/forms/inputs/form-color-picker/form-color-picker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { CustomValidators } from '../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../models/bad-request';
import { CategoryAbsencesApiService } from '../../../services/api/category-absences-api.service';
import { JwtService } from '../../../services/jwt.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CategoryAbsenceCreateRequest } from './category-absence-create-request.model';

@Component({
  selector: 'aw-category-absence-create',
  templateUrl: './category-absence-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    MatCardModule,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    FormInputComponent,
    FormColorPickerComponent,
    NonFieldErrorsComponent,
    BadgeComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CategoryAbsenceCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly jwtService = inject(JwtService);
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
    const categoryAbsenceCreateRequest = this.form.value as CategoryAbsenceCreateRequest;
    categoryAbsenceCreateRequest.companyId = this.jwtService.getCompanyId();

    this.categoryAbsencesApiService
      .post<CategoryAbsenceCreateRequest, string>(
        categoryAbsenceCreateRequest,
        ApiUrl.categoryAbsences.createCompanyAbsence
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Ausencia creada con éxito');
          this.router.navigateByUrl(SiteUrl.categoryAbsences.list);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Ausencias', SiteUrl.categoryAbsences.list)
      .add('Crear ausencia', SiteUrl.categoryAbsences.create, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.max(256)]],
      background: [CommonUtils.getRandomColorHexadecimal(), [Validators.required, CustomValidators.colorHexadecimal]],
      color: [CommonUtils.getRandomColorHexadecimal(), [Validators.required, CustomValidators.colorHexadecimal]]
    });
  }
}
