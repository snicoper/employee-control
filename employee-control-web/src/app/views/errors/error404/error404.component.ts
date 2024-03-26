import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { SiteUrls } from '../../../core/urls/_index';

@Component({
  selector: 'aw-error404',
  templateUrl: './error404.component.html',
  standalone: true,
  imports: [ViewBaseComponent, BtnBackComponent, RouterLink]
})
export class Error404Component {
  siteUrls = SiteUrls;
}
