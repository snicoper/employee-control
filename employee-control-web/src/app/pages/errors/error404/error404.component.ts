import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { SiteUrls } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-error404',
  templateUrl: './error404.component.html',
  standalone: true,
  imports: [PageBaseComponent, BtnBackComponent, RouterLink]
})
export class Error404Component {
  siteUrls = SiteUrls;
}