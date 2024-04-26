import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SiteUrl } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-company-calendar-header-links',
  templateUrl: './company-calendar-header-links.component.html',
  styleUrl: './company-calendar-header-links.component.scss',
  standalone: true,
  imports: [RouterLink, MatButtonModule]
})
export class CompanyCalendarHeaderLinksComponent {
  readonly siteUrl = SiteUrl;
}
