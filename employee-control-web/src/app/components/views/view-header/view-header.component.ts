import { Component, Input } from '@angular/core';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';

@Component({
  selector: 'aw-view-header',
  templateUrl: './view-header.component.html'
})
export class ViewHeaderComponent {
  @Input() breadcrumb = new BreadcrumbCollection();
}
