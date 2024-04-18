import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CompanyTaskDetailsComponent } from './company-task-details/company-task-details.component';
import { CompanyTaskUsersComponent } from './company-task-users/company-task-users.component';
import { CompanyTaskViewService } from './company-task-view.service';

@Component({
  selector: 'aw-company-task-view',
  templateUrl: './company-task-view.component.html',
  styleUrl: './company-task-view.component.scss',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    PageBaseComponent,
    PageHeaderComponent,
    CompanyTaskDetailsComponent,
    CompanyTaskUsersComponent
  ],
  providers: [CompanyTaskViewService]
})
export class CompanyTaskViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly companyTaskViewService = inject(CompanyTaskViewService);

  readonly companyTaskSelected = computed(() => this.companyTaskViewService.companyTaskSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: string;

  constructor() {
    this.setBreadcrumb();
    this.companyTaskId = this.route.snapshot.paramMap.get('id') as string;
    this.companyTaskViewService.loadCompanyTaskById(this.companyTaskId);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrl.companyTasks.list).add('Detalles', SiteUrl.companyTasks.details, '', false);
  }
}
