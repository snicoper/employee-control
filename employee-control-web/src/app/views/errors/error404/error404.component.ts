import { Component } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';

@Component({
  selector: 'aw-error404',
  templateUrl: './error404.component.html'
})
export class Error404Component {
  siteUrls = SiteUrls;
}
