import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbCollection } from './breadcrumb-collection';

@Component({
  selector: 'aw-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [NgClass, RouterLink]
})
export class BreadcrumbComponent {
  @Input() breadcrumb = new BreadcrumbCollection();
}
