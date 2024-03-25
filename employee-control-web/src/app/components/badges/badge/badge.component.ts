import { Component, Input } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';

@Component({
    selector: 'aw-badge',
    templateUrl: './badge.component.html',
    standalone: true,
    imports: [NgStyle, NgClass]
})
export class BadgeComponent {
  @Input({ required: true }) background: string | undefined;
  @Input({ required: true }) color: string | undefined;
  @Input({ required: true }) name: string | undefined;
  @Input() pill = false;
  @Input() extraCss = '';
}
