import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { BadRequest } from '@aw/models/bad-request';
import { Department } from '@aw/models/entities/department.model';
import { DepartmentApiService } from '@aw/services/api/department-api.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-department-update',
  templateUrl: './department-update.component.html'
})
export class DepartmentUpdateComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly toastrService = inject(ToastrService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly departmentId: string;
  readonly urlDepartmentDetails: string;

  form: FormGroup = this.fb.group({});
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
    this.form = this.fb.group({
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
