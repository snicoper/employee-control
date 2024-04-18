import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentSelectedService } from './department-selected.service';
import { DepartmentUsersComponent } from './department-users/department-users.component';

@Component({
  selector: 'aw-department-view',
  templateUrl: './department-view.component.html',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    PageBaseComponent,
    PageHeaderComponent,
    DepartmentDetailsComponent,
    DepartmentUsersComponent
  ],
  providers: [DepartmentSelectedService]
})
export class DepartmentViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly departmentId: string;

  constructor() {
    this.setBreadcrumb();
    this.departmentId = this.route.snapshot.paramMap.get('id') as string;
    this.departmentSelectedService.loadDepartmentById(this.departmentId);
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Departamentos', SiteUrl.departments.list)
      .add('Detalles', SiteUrl.departments.details, '', false);
  }
}
