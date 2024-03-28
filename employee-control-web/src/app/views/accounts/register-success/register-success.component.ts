import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { SiteUrls } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-register-success',
  templateUrl: './register-success.component.html',
  standalone: true,
  imports: [ViewBaseComponent, RouterLink]
})
export class RegisterSuccessComponent {
  siteUrls = SiteUrls;
}
