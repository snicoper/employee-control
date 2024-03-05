import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-badge',
  templateUrl: './badge.component.html'
})
export class BadgeComponent {
  @Input({ required: true }) background: string | undefined;
  @Input({ required: true }) color: string | undefined;
  @Input({ required: true }) name: string | undefined;
  @Input() pill = false;
  @Input() extraCss = '';
}
