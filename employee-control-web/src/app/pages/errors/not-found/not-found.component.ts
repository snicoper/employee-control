import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { PageSimpleComponent } from '../../../components/pages/page-simple/page-simple.component';
import { SiteUrl } from '../../../core/urls/site-urls';

@Component({
  selector: 'aw-not-found',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatCardModule, PageSimpleComponent, BtnBackComponent, MatButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  readonly siteUrl = SiteUrl;
}
