import { Component } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/_index';
import { RouterLink } from '@angular/router';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-register-success',
    templateUrl: './register-success.component.html',
    standalone: true,
    imports: [ViewBaseComponent, RouterLink]
})
export class RegisterSuccessComponent {
  siteUrls = SiteUrls;
}
