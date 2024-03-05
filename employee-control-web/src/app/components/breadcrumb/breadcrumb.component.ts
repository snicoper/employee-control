import { Component, Input } from '@angular/core';
import { BreadcrumbCollection } from './breadcrumb-collection';

@Component({
  selector: 'aw-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  @Input() breadcrumb = new BreadcrumbCollection();
}
