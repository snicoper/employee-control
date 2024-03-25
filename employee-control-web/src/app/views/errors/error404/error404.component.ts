import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteUrls } from '@aw/core/urls/_index';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
  selector: 'aw-error404',
  templateUrl: './error404.component.html',
  standalone: true,
  imports: [ViewBaseComponent, BtnBackComponent, RouterLink]
})
export class Error404Component {
  siteUrls = SiteUrls;
}
