import { Component } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';

@Component({
  selector: 'aw-register-success',
  templateUrl: './register-success.component.html'
})
export class RegisterSuccessComponent {
  siteUrls = SiteUrls;
}
