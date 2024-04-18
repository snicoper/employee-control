import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { BreadcrumbCollection } from '../../breadcrumb/breadcrumb-collection';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'aw-page-header',
  standalone: true,
  imports: [MatCardModule, MatDivider, BreadcrumbComponent],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  breadcrumb = input(new BreadcrumbCollection());
}
