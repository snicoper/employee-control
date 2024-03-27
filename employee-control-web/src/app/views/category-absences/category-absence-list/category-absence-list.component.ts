import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badges/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { CardComponent } from '../../../components/cards/card/card.component';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { TableHeaderComponent } from '../../../components/tables/table-header/table-header.component';
import { TableHeaderConfig } from '../../../components/tables/table-header/table-header.config';
import { TableInputSearchComponent } from '../../../components/tables/table-input-search/table-input-search.component';
import { TableComponent } from '../../../components/tables/table/table.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { ViewHeaderComponent } from '../../../components/views/view-header/view-header.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrls } from '../../../core/urls/api-urls';
import { SiteUrls } from '../../../core/urls/site-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { CategoryAbsence } from '../../../models/entities/category-absence.model';
import { BoolToIconPipe } from '../../../pipes/_index';
import { CategoryAbsencesApiService } from '../../../services/api/category-absences-api.service';
import { CurrentCompanyEmployeeStateService } from '../../../services/states/_index';
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
  private readonly currentCompanyEmployeeStateService = inject(CurrentCompanyEmployeeStateService);
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
      companyId: this.currentCompanyEmployeeStateService.get()?.id.toString() ?? ''
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
