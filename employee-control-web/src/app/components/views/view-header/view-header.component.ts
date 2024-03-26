import { Component, Input } from '@angular/core';
import { BreadcrumbCollection } from '../../breadcrumb/breadcrumb-collection';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { CardComponent } from '../../cards/card/card.component';

@Component({
  selector: 'aw-view-header',
  templateUrl: './view-header.component.html',
  standalone: true,
  imports: [CardComponent, BreadcrumbComponent]
})
export class ViewHeaderComponent {
  @Input() breadcrumb = new BreadcrumbCollection();
}
