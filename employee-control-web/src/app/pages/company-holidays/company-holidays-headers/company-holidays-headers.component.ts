import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SiteUrl } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-company-holidays-headers',
  templateUrl: './company-holidays-headers.component.html',
  standalone: true,
  imports: [RouterLink, MatButtonModule]
})
export class CompanyHolidaysHeadersComponent {
  readonly siteUrl = SiteUrl;
}
