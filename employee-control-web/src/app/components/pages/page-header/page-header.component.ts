import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { BreadcrumbCollection } from '../../breadcrumb/breadcrumb-collection';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'aw-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  standalone: true,
  imports: [MatCardModule, MatDivider, BreadcrumbComponent]
})
export class PageHeaderComponent {
  breadcrumb = input(new BreadcrumbCollection());
}
