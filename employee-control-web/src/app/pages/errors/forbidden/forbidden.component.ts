import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { PageSimpleComponent } from '../../../components/pages/page-simple/page-simple.component';
import { SiteUrl } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-forbidden',
  templateUrl: './forbidden.component.html',
  standalone: true,
  imports: [RouterLink, PageSimpleComponent, BtnBackComponent]
})
export class ForbiddenComponent {
  siteUrl = SiteUrl;
}
