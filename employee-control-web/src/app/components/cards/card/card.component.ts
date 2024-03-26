import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'aw-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgClass, SpinnerComponent]
})
export class CardComponent {
  @Input() loading = false;
  @Input() spinnerSize = 100;
  @Input() extraCss = '';
}
