import { Component } from '@angular/core';
import { DotComponent } from '../dot/dot.component';

@Component({
  selector: 'aw-dot-success',
  templateUrl: './dot-success.component.html',
  standalone: true,
  imports: [DotComponent]
})
export class DotSuccessComponent {}
