import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormColorComponent } from '../../../components/forms/inputs/form-color/form-color.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { Department } from '../../../models/entities/department.model';
import { JwtService } from '../../../services/jwt.service';
import { DepartmentApiService } from './../../../services/api/department-api.service';
import { DepartmentCreateResponse } from './department-create-response.model';

@Component({
  selector: 'aw-department-create',
  templateUrl: './department-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PageBaseComponent,
    CardComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormColorComponent,
    BadgeComponent,
    BtnLoadingComponent,
    BtnBackComponent
  ]
})
export class DepartmentCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.formBuilder.group({});
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
          const url = CommonUtils.urlReplaceParams(SiteUrls.departments.details, { id: result.departmentId });
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
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      background: [CommonUtils.getRandomColorHexadecimal(), Validators.required],
      color: [CommonUtils.getRandomColorHexadecimal(), Validators.required]
    });
  }
}
