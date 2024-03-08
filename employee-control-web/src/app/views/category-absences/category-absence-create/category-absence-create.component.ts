import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'aw-category-absence-create',
  templateUrl: './category-absence-create.component.html'
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
