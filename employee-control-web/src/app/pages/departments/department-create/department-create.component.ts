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
import { BadRequest } from '../../../models/bad-request';
import { Department } from '../../../models/entities/department.model';
import { DepartmentApiService } from '../../../services/api/department-api.service';
import { JwtService } from '../../../services/jwt.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { DepartmentCreateResponse } from './department-create-response.model';

@Component({
  selector: 'aw-department-create',
  templateUrl: './department-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormColorPickerComponent,
    BtnLoadingComponent,
    BtnBackComponent,
    BadgeComponent
  ]
})
export class DepartmentCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly jwtService = inject(JwtService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;

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

    const department = this.form.value as Department;
    department.companyId = this.jwtService.getCompanyId();

    this.departmentApiService
      .post<Department, DepartmentCreateResponse>(department, ApiUrl.departments.createDepartment)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: DepartmentCreateResponse) => {
          const url = CommonUtils.urlReplaceParams(SiteUrl.departments.details, { id: result.departmentId });
          this.snackBarService.success('Departamento creado con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Departamentos', SiteUrl.departments.list, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      background: [CommonUtils.getRandomColorHexadecimal(), Validators.required],
      color: [CommonUtils.getRandomColorHexadecimal(), Validators.required]
    });
  }
}
