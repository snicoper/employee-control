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
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiUrls, SiteUrls } from '../../../core/urls/_index';
import { getRandomColorHexadecimal, urlReplaceParams } from '../../../core/utils/_index';
import { BadRequest } from '../../../models/_index';
import { JwtService } from '../../../services/_index';
import { CompanyTaskApiService } from '../../../services/api/_index';
import { CompanyTaskCreateRequest } from './company-task-create-request.model';

@Component({
  selector: 'aw-company-task-create',
  templateUrl: './company-task-create.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    NonFieldErrorsComponent,
    BadgeComponent,
    FormInputComponent,
    FormColorComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
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
