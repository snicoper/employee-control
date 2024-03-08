import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { TableHeaderConfig } from '@aw/components/tables/table-header/table-header.config';
import { ApiResult } from '@aw/core/features/api-result/_index';
import { ApiUrls } from '@aw/core/urls/_index';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { CategoryAbsence } from '@aw/models/entities/_index';
import { CategoryAbsencesApiService } from '@aw/services/api/_index';
import { CurrentCompanyEmployeeService } from '@aw/services/states/_index';
import { finalize } from 'rxjs';
import { categoryAbsenceListTableHeader } from './category-absence-list-table-headers';

@Component({
  selector: 'aw-category-absence-list',
  templateUrl: './category-absence-list.component.html'
})
export class CategoryAbsenceListComponent {
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);
  private readonly currentCompanyEmployeeService = inject(CurrentCompanyEmployeeService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  apiResult = new ApiResult<CategoryAbsence>();
  tableHeaderConfig = new TableHeaderConfig();
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.configureTableHeaders();
    this.setBreadcrumb();
    this.loadCompanyTasks();
  }

  handleReloadData(): void {
    this.loadCompanyTasks();
  }

  handleClickClean(event: ApiResult<CategoryAbsence>): void {
    this.apiResult = event;
    this.handleReloadData();
  }

  handleEdit(categoryAbsence: CategoryAbsence): void {
    const url = urlReplaceParams(SiteUrls.categoryAbsences.update, { id: categoryAbsence.id });
    this.router.navigateByUrl(url);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Ausencias', SiteUrls.categoryAbsences.list, '', false);
  }

  private configureTableHeaders(): void {
    this.tableHeaderConfig.addHeaders(categoryAbsenceListTableHeader);
  }

  private loadCompanyTasks(): void {
    this.loading = true;
    const url = urlReplaceParams(ApiUrls.categoryAbsences.getCategoryAbsenceByCompanyIdPaginated, {
      companyId: this.currentCompanyEmployeeService.getValue()?.id.toString() ?? ''
    });

    this.categoryAbsencesApiService
      .getPaginated<CategoryAbsence>(this.apiResult, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CategoryAbsence>) => {
          this.apiResult = result;
        }
      });
  }
}
