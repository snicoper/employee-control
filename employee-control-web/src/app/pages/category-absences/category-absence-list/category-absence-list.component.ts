import { Component, ViewChild, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { CategoryAbsence } from '../../../models/entities/category-absence.model';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { CategoryAbsencesApiService } from '../../../services/api/category-absences-api.service';

@Component({
  selector: 'aw-category-absence-list',
  templateUrl: './category-absence-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinner,
    PageBaseComponent,
    PageHeaderComponent,
    BadgeComponent,
    DotComponent,
    BoolToIconPipe,
    TableFilterComponent
  ]
})
export class CategoryAbsenceListComponent {
  private readonly categoryAbsencesApiService = inject(CategoryAbsencesApiService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;
  readonly displayedColumns = ['description', 'active', 'background', 'color', 'actions'];
  readonly fieldsFilter = ['description'];

  dataSource!: MatTableDataSource<CategoryAbsence, MatPaginator>;
  apiResult = new ApiResult<CategoryAbsence>();
  loading = true;

  constructor() {
    this.setBreadcrumb();
    this.loadCategoryAbsences();
  }

  handleButtonUpdate(categoryAbsence: CategoryAbsence): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.categoryAbsences.update, { id: categoryAbsence.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadCategoryAbsences();
  }

  handleFilterChange(apiResult: ApiResult<CategoryAbsence>): void {
    this.apiResult = apiResult;
    this.loadCategoryAbsences();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult.handleSortChange(sortState);
    this.loadCategoryAbsences();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Ausencias', SiteUrl.categoryAbsences.list, '', false);
  }

  private loadCategoryAbsences(): void {
    this.categoryAbsencesApiService
      .getPaginated<CategoryAbsence>(this.apiResult, ApiUrl.categoryAbsences.getCategoryAbsencePaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ApiResult<CategoryAbsence>) => {
          this.apiResult = ApiResult.clone<CategoryAbsence>(result);
          this.dataSource = new MatTableDataSource(result.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
