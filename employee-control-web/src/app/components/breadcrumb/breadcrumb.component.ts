import { Component, Input } from '@angular/core';
import { BreadcrumbCollection } from './breadcrumb-collection';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'aw-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    imports: [NgClass, RouterLink]
})
export class BreadcrumbComponent {
  @Input() breadcrumb = new BreadcrumbCollection();
}
