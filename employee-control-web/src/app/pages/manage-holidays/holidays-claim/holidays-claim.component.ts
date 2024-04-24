import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { SiteUrl } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-holidays-claim',
  templateUrl: './holidays-claim.component.html',
  styleUrl: './holidays-claim.component.scss',
  standalone: true,
  imports: [RouterLink, PageBaseComponent, PageHeaderComponent]
})
export class HolidaysClaimComponent {
  readonly breadcrumb = new BreadcrumbCollection();
  readonly siteUrl = SiteUrl;

  yearSelected = DateTime.local();

  constructor() {
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Pendientes', SiteUrl.manageHolidays.claims, '', false);
  }
}
