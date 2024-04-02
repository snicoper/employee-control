import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { CategoryAbsence } from '../../../models/entities/category-absence.model';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { CategoryAbsencesApiService } from '../../../services/api/category-absences-api.service';
import { categoryAbsenceListTableHeader } from './category-absence-list-table-headers';

@Component({
  selector: 'aw-category-absence-list',
  templateUrl: './category-absence-list.component.html',
  standalone: true,
  imports: [
    PageBaseComponent,
    PageHeaderComponent,
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
export class CategoryAbsenceListComponent {
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);
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
    const url = CommonUtils.urlReplaceParams(SiteUrls.categoryAbsences.update, { id: categoryAbsence.id });
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
    this.categoryAbsencesApiService
      .getPaginated<CategoryAbsence>(this.apiResult, ApiUrls.categoryAbsences.getCategoryAbsencePaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CategoryAbsence>) => {
          this.apiResult = result;
        }
      });
  }
}
