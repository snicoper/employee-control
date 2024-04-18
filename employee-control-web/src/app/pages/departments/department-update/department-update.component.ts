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
import { Department } from '../../../models/entities/department.model';
import { DepartmentApiService } from '../../../services/api/department-api.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'aw-department-update',
  templateUrl: './department-update.component.html',
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
export class DepartmentUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly snackBarService = inject(SnackBarService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly departmentId: string;
  readonly urlDepartmentDetails: string;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingDepartment = false;
  loadingForm = false;
  submitted = false;
  department: Department | undefined;

  constructor() {
    this.departmentId = this.route.snapshot.paramMap.get('id') as string;
    this.urlDepartmentDetails = CommonUtils.urlReplaceParams(SiteUrl.departments.details, { id: this.departmentId });
    this.loadDepartment();
    this.setBreadcrumb();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const department = this.form.value as Department;
    department.id = this.departmentId;

    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.updateDepartment, { id: this.departmentId });

    this.departmentApiService
      .put<Department, undefined>(department, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Departamento editado con éxito.');
          this.router.navigateByUrl(this.urlDepartmentDetails);
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Departamentos', SiteUrl.departments.list)
      .add('Detalles', this.urlDepartmentDetails)
      .add('Editar', SiteUrl.departments.update, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.department?.name, [Validators.required]],
      background: [this.department?.background, [Validators.required]],
      color: [this.department?.color, [Validators.required]],
      active: [this.department?.active]
    });
  }

  private loadDepartment(): void {
    this.loadingDepartment = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.departments.getDepartmentById, { id: this.departmentId });

    this.departmentApiService
      .get<Department>(url)
      .pipe(finalize(() => (this.loadingDepartment = false)))
      .subscribe({
        next: (result: Department) => {
          this.department = result;
          this.buildForm();
        }
      });
  }
}
