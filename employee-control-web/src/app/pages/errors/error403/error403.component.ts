import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { SiteUrls } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-error403',
  templateUrl: './error403.component.html',
  standalone: true,
  imports: [RouterLink, ViewBaseComponent, CardComponent, BtnBackComponent]
})
export class Error403Component {
  siteUrls = SiteUrls;
}
