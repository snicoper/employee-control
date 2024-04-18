import { Component, input } from '@angular/core';
import { DotComponent } from '../dot/dot.component';

@Component({
  selector: 'aw-dot-warning',
  templateUrl: './dot-warning.component.html',
  standalone: true,
  imports: [DotComponent]
})
export class DotWarningComponent {
  size = input('25');
}
