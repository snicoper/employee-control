import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/features/api-result/api-result';
import { SiteUrls } from '@aw/core/urls/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { Department } from '@aw/models/entities/department.model';
import { JwtService } from '@aw/services/_index';
import { DepartmentApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { departmentListTableHeaders } from './department-list-table-heades';

@Component({
  selector: 'aw-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent {
  private readonly departmentApiService = inject(DepartmentApiService);
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<Department>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.loadDepartments();
    this.configureTableHeaders();
    this.setBreadcrumb();
  }

  handleReloadData(): void {
    this.loadDepartments();
  }

  handleClickClean(event: ApiResult<Department>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleSelectItem(department: Department): void {
    const url = urlReplaceParams(SiteUrls.departments.details, { id: department.id });
    this.router.navigateByUrl(url);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(departmentListTableHeaders);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Departamentos', SiteUrls.departments.list, '', false);
  }

  private loadDepartments(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.departments.getDepartmentsByCompanyIdPaginated, {
      companyId: this.jwtService.getCompanyId()
    });

    this.departmentApiService
      .getPaginated<Department>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.apiResult = result;
        }
      });
  }
}
