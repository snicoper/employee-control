import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-dot',
  templateUrl: './dot.component.html'
})
export class DotComponent {
  @Input({ required: true }) color = '';
}
