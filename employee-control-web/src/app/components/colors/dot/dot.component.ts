import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'aw-dot',
    templateUrl: './dot.component.html',
    standalone: true,
    imports: [NgStyle]
})
export class DotComponent {
  @Input({ required: true }) color = '';
}
