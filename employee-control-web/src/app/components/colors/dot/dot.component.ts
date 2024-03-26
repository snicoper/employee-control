import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-dot',
  templateUrl: './dot.component.html',
  standalone: true,
  imports: [NgStyle]
})
export class DotComponent {
  @Input({ required: true }) color = '';
}
