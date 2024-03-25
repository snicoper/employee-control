import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { getRandomColorHexadecimal, urlReplaceParams } from '@aw/core/utils/_index';
import { BadRequest } from '@aw/models/bad-request';
import { Department } from '@aw/models/entities/department.model';
import { JwtService } from '@aw/services/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { DepartmentApiService } from './../../../services/api/department-api.service';
import { DepartmentCreateResponse } from './depatment-create-response.model';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormColorComponent } from '../../../components/forms/inputs/form-color/form-color.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-department-create',
    templateUrl: './department-create.component.html',
    standalone: true,
    imports: [ViewBaseComponent, ViewHeaderComponent, CardComponent, FormsModule, ReactiveFormsModule, NonFieldErrorsComponent, BadgeComponent, FormInputComponent, FormColorComponent, BtnLoadingComponent, BtnBackComponent]
})
export class DepartmentCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  breadcrumb = new BreadcrumbCollection();

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

    const department = this.form.value as Department;
    department.companyId = this.jwtService.getCompanyId();

    this.departmentApiService
      .post<Department, DepartmentCreateResponse>(department, ApiUrls.departments.createDepartment)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: DepartmentCreateResponse) => {
          const url = urlReplaceParams(SiteUrls.departments.details, { id: result.departmentId });
          this.toastrService.success('Departamento creado con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Departamentos', SiteUrls.departments.list, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      background: [getRandomColorHexadecimal(), Validators.required],
      color: [getRandomColorHexadecimal(), Validators.required]
    });
  }
}
