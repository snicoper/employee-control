import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { categoryAbsenceListTableHeader } from './category-absence-list-table-headers';

@Component({
  selector: 'aw-category-absence-list',
  templateUrl: './category-absence-list.component.html',
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
