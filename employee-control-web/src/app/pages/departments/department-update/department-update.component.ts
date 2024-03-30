import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormColorComponent } from '../../../components/forms/inputs/form-color/form-color.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { Department } from '../../../models/entities/department.model';
import { DepartmentApiService } from '../../../services/api/department-api.service';

@Component({
  selector: 'aw-department-update',
  templateUrl: './department-update.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
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
export class DepartmentUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly toastrService = inject(ToastrService);

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
    this.urlDepartmentDetails = urlReplaceParams(SiteUrls.departments.details, { id: this.departmentId });
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

    const url = urlReplaceParams(ApiUrls.departments.updateDepartment, { id: this.departmentId });

    this.departmentApiService
      .put<Department, undefined>(department, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Departamento editado con éxito.');
          this.router.navigateByUrl(this.urlDepartmentDetails);
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Departamentos', SiteUrls.departments.list)
      .add('Detalles', this.urlDepartmentDetails)
      .add('Editar', SiteUrls.departments.update, '', false);
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
    const url = urlReplaceParams(ApiUrls.departments.getDepartmentById, { id: this.departmentId });

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
