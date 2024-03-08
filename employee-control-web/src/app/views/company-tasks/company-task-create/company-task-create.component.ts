import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { getRandomColorHexadecimal, urlReplaceParams } from '@aw/core/utils/common-utils';
import { BadRequest } from '@aw/models/bad-request';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { JwtService } from '@aw/services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CompanyTaskCreateRequest } from './company-task-create-request.model';

@Component({
  selector: 'aw-company-task-create',
  templateUrl: './company-task-create.component.html'
})
export class CompanyTaskCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly companyTaskApiService = inject(CompanyTaskApiService);
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

    const companyTaskCreateRequest = this.form.value as CompanyTaskCreateRequest;
    companyTaskCreateRequest.companyId = this.jwtService.getCompanyId();

    this.companyTaskApiService
      .post<CompanyTaskCreateRequest, string>(companyTaskCreateRequest, ApiUrls.companyTasks.createCompanyTask)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          const url = urlReplaceParams(SiteUrls.companyTasks.details, { id: result });
          this.toastrService.success('Tarea creada con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Tareas', SiteUrls.companyTasks.list)
      .add('Crear tarea', SiteUrls.companyTasks.create, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      background: [getRandomColorHexadecimal(), [Validators.required]],
      color: [getRandomColorHexadecimal(), [Validators.required]]
    });
  }
}
