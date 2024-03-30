import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { SiteUrls } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-error403',
  templateUrl: './error403.component.html',
  standalone: true,
  imports: [RouterLink, PageBaseComponent, CardComponent, BtnBackComponent]
})
export class Error403Component {
  siteUrls = SiteUrls;
}
