import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { departmentListTableHeaders } from './department-list-table-heades';

@Component({
  selector: 'aw-department-list',
  templateUrl: './department-list.component.html',
  standalone: true,
  imports: [
    ViewBaseComponent,
    ViewHeaderComponent,
    CardComponent,
    RouterLink,
    TableInputSearchComponent,
    TableComponent,
    TableHeaderComponent,
    BadgeComponent,
    DotComponent,
    PaginationComponent,
    BoolToIconPipe
  ]
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
