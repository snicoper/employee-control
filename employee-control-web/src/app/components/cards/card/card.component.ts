import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() loading = false;
  @Input() spinnerSize = 100;
  @Input() extraCss = '';
}
